import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { useKeepAwake } from "expo-keep-awake";

// import axios from "axios";
import { createASNT } from "../../store/actions/assignments";
import { handleNext, handleStart } from "../../store/actions/quiz";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useTheme, Button } from "react-native-paper";
import nlp from "compromise";
// import Title from "./Title";
import ProgressBar from "./Progress";
// import Progress from "./DaragAndDrop/Header";
import PhotOptions from "./MultipleChoice/PhotoOption";
import TextChoices from "./MultipleChoice/TextOptions";
import Match from "./Match/index";
import DragAndDrop from "./DaragAndDrop/Dulingo";
import { View, StatusBar, Dimensions } from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
const { width, height } = Dimensions.get("window");
import ScoreModal from "./model";
import { SafeAreaView } from "react-native-safe-area-context";

const Questions = props => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const sound = React.useRef(new Audio.Sound());

  const [isPlaying, setIsplaying] = React.useState(false);
  const [didJustFinish, setDidJustFinish] = React.useState(false);

  const {
    questions,
    testID,
    token,
    username,
    lessonId,
    unitId,
    sectionId
  } = props;

  const allQuestions = questions;

  React.useEffect(() => {
    // console.log("use effect questions");
    LoadAudio();
    return () => {
      UnloadSound();
    };
  }, [props.index]);

  const UnloadSound = () => {
    sound.current.unloadAsync();
  };

  const LoadAudio = async () => {
    if (allQuestions[props.index].audio) {
      // console.log("loading sound", props.index);
      try {
        const audio = allQuestions[props.index].audio.audio;
        const status = await sound.current.getStatusAsync();
        if (status.isLoaded === false) {
          const result = await sound.current.loadAsync(
            { uri: audio },
            {},
            true
          );
          if (result.isLoaded === false) {
            return console.log("Error in Loading Audio");
          }
        }
        PlayAudio();
      } catch (error) {
        console.log("error in catch", error);
      }
    }
  };

  const PlayAudio = async () => {
    // console.log("playing sound");
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        sound.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        if (result.isPlaying === false && !didJustFinish) {
          setIsplaying(true);
          return sound.current.playAsync();
        }
        if (result.isPlaying === false && didJustFinish) {
          setIsplaying(true);
          return sound.current.replayAsync();
        }
      }
      LoadAudio();
    } catch (error) {
      console.log(error);
    }
  };

  const onPlaybackStatusUpdate = audio => {
    if (audio.isLoaded) {
      setDidJustFinish(false);
      if (audio.didJustFinish) {
        setDidJustFinish(true);
        setIsplaying(false);
      }
    }
  };

  const handleSubmitTest = () => {
    try {
      // props.handleStart();
      // props.createASNT(token, data);
      // console.log("submitting");
      sectionId != null
        ? navigation.navigate("Section Details", { id: sectionId })
        : navigation.navigate("Unit Details", { id: unitId });
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const Tokenize = text => {
    let doc = nlp(text);
    let doc1 = doc.json();
    let terms = doc1[0].terms;
    let words2 = [];
    for (let i = 0; i < terms.length; i++) {
      var singleObj = {};
      // console.log(terms[i].tags);
      singleObj["id"] = i;
      singleObj["word"] = terms[i].text;
      singleObj["tags"] = terms[i].tags;
      singleObj["pre_space"] = terms[i].pre;
      singleObj["post_space"] = terms[i].post;
      words2.push(singleObj);
    }

    let currentIndex = words2.length,
      randomIndex;
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [words2[currentIndex], words2[randomIndex]] = [
        words2[randomIndex],
        words2[currentIndex]
      ];
    }
    // console.log(Bucket);
    return words2;
  };

  const processMatch = (text, randomize) => {
    const sentance_list = text.split(",");
    const Bucket = [];
    for (let i = 0; i < sentance_list.length; i++) {
      let obj = {};
      obj["key"] = i;
      obj["word"] = sentance_list[i];
      Bucket.push(obj);
    }

    // While there remain elements to shuffle...
    if (randomize) {
      let currentIndex = Bucket.length,
        randomIndex;
      while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [Bucket[currentIndex], Bucket[randomIndex]] = [
          Bucket[randomIndex],
          Bucket[currentIndex]
        ];
      }
      // console.log(Bucket);
      return Bucket;
    }
    return Bucket;
  };
  useKeepAwake();
  return (
    <SafeAreaView
      style={{
        flex: 1
        // flexDirection: "row"
        // backgroundColor: "red"
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ProgressBar
        index={props.index}
        allQuestionsLength={allQuestions.length}
      />
      <View style={{ flex: 1 }}>
        {/* ///render options start  */}
        {allQuestions[props.index].questionType.type === "CHOICE" ? (
          <>
            {allQuestions[props.index].questionType.assetType === "TEXT" ? (
              <>
                <TextChoices
                  numberOfQuestions={allQuestions.length - 1}
                  title={allQuestions[props.index].title}
                  question={allQuestions[props.index].question}
                  Choices={allQuestions[props.index].text_choices}
                  has_audio={allQuestions[props.index].questionType.has_audio}
                  PlayAudio={PlayAudio}
                  isPlaying={isPlaying}
                />
              </>
            ) : allQuestions[props.index].questionType.assetType === "PHOTO" ? (
              <>
                <PhotOptions
                  numberOfQuestions={allQuestions.length - 1}
                  title={allQuestions[props.index].title}
                  question={allQuestions[props.index].question}
                  Photos={allQuestions[props.index].photo_choices}
                  has_audio={allQuestions[props.index].questionType.has_audio}
                  PlayAudio={PlayAudio}
                  isPlaying={isPlaying}
                  UnloadSound={UnloadSound}
                />
              </>
            ) : null}
          </>
        ) : allQuestions[props.index].questionType.type === "DRAG" ? (
          <>
            <DragAndDrop
              numberOfQuestions={allQuestions.length - 1}
              title={allQuestions[props.index].title}
              type={allQuestions[props.index].questionType.pos}
              qustion={Tokenize(allQuestions[props.index].question)}
              answer={allQuestions[props.index].answer}
              has_audio={allQuestions[props.index].questionType.has_audio}
              PlayAudio={PlayAudio}
              isPlaying={isPlaying}
            />
          </>
        ) : allQuestions[props.index].questionType.type === "MATCH" ? (
          <Match
            numberOfQuestions={allQuestions.length - 1}
            title={allQuestions[props.index].title}
            qustion={allQuestions[props.index].question}
            BucketA={processMatch(allQuestions[props.index].question, false)}
            BucketB={processMatch(allQuestions[props.index].answer, true)}
            answer={processMatch(allQuestions[props.index].answer, false)}
          />
        ) : // <Text style={{ justifyContent: "center" }}>Test</Text>
        null}

        {/* {allQuestions[currentQuestionIndex].has_audio ? (
          <AudioPlayerWiouthControl
            mp3={allQuestions[currentQuestionIndex].audio}
          />
        ) : null} */}
        {/* Score Modal */}
      </View>
      {props.showScoreModal ? (
        <ScoreModal
          handleSubmitTest={handleSubmitTest}
          qlength={allQuestions.length}
        />
      ) : null}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    index: state.quiz.index,
    score: state.quiz.score,
    showScoreModal: state.quiz.showScoreModal
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createASNT: (token, asnt) => dispatch(createASNT(token, asnt)),
    handleNext: data => dispatch(handleNext(data)),
    handleStart: data => dispatch(handleStart(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions);

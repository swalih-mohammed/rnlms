import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import { createASNT } from "../../store/actions/assignments";
import { handleNext, handleStart } from "../../store/actions/quiz";
import { useNavigation } from "@react-navigation/native";
// import { Transition, Transitioning } from "react-native-reanimated";

import AudioPlayerWiouthControl from "../../Helpers/PlayerWithoutControl";
import { useTheme, Button } from "react-native-paper";
import * as Speech from "expo-speech";
import nlp from "compromise";
// import Title from "./Title";
import ProgressBar from "./Progress";
// import Progress from "./DaragAndDrop/Header";
import PhotOptions from "./MultipleChoice/PhotoOption";
import TextChoices from "./MultipleChoice/TextOptions";
import Match from "./Match/index";
// import NextButton from "./NextButton";
// import DragAndDrop from "./DaragAndDrop/index";
import DragAndDrop from "./DaragAndDrop/Dulingo";
// import { QuizContext } from "./QuizContext";

// import NextButton from "./MultipleChoice/HandleNext";

// import Test from "../../Helpers/testAudio";

import {
  View,
  StatusBar,
  Animated,
  Dimensions,
  StyleSheet,
  Text
} from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
const { width, height } = Dimensions.get("window");
import ScoreModal from "./model";
import { SafeAreaView } from "react-native-safe-area-context";

const Questions = props => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const {
    questions,
    testID,
    token,
    username,
    lessonId,
    unitId,
    sectionId
  } = props;
  // console.log(questions);

  const allQuestions = questions;
  const [progress, setProgress] = useState(new Animated.Value(0));
  // const progressAnim = progress.interpolate({
  //   inputRange: [0, allQuestions.length],
  //   outputRange: ["0%", "100%"]
  // });

  // useEffect(() => {
  //   console.log("question comp", props.index);
  // }, []);

  // const speakQuestion = () => {
  //   Speech.speak(allQuestions[currentQuestionIndex]?.question);
  //   // Speech.speak(text);
  // };

  const handleSubmitTest = () => {
    try {
      props.handleStart();
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
      <View
        // ref={ref}
        // transition={transition}
        style={{ flex: 1 }}
        // style={{
        //   flex: 1,
        //   paddingVertical: 10,
        //   paddingHorizontal: 16,
        //   backgroundColor: COLORS.white,
        //   position: "relative"
        // }}
      >
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
                  has_audio={
                    allQuestions[props.index].questionType.type.has_audio
                  }
                />
              </>
            ) : allQuestions[props.index].questionType.assetType === "PHOTO" ? (
              <>
                <PhotOptions
                  numberOfQuestions={allQuestions.length - 1}
                  title={allQuestions[props.index].title}
                  question={allQuestions[props.index].question}
                  Photos={allQuestions[props.index].photo_choices}
                  has_audio={
                    allQuestions[props.index].questionType.type.has_audio
                  }
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
      <ScoreModal
        handleSubmitTest={handleSubmitTest}
        qlength={allQuestions.length}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    index: state.quiz.index,
    score: state.quiz.score
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

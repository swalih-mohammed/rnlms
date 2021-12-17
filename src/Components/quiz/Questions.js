import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import { createASNT } from "../../store/actions/assignments";
import { handleNext, handleStart } from "../../store/actions/quiz";
import { useNavigation } from "@react-navigation/native";
import AudioPlayerWiouthControl from "../../Helpers/PlayerWithoutControl";
import { useTheme, Button } from "react-native-paper";
import * as Speech from "expo-speech";
import nlp from "compromise";
import Title from "./Title";
import ProgressBar from "./Progress";
import Progress from "./DaragAndDrop/Header";
import PhotOptions from "./MultipleChoice/PhotoOption";
import TextChoices from "./MultipleChoice/TextOptions";
import NextButton from "./NextButton";
// import DragAndDrop from "./DaragAndDrop/index";
import DragAndDrop from "./DaragAndDrop/Dulingo";
import { QuizContext } from "./QuizContext";

// import NextButton from "./MultipleChoice/HandleNext";

// import Test from "../../Helpers/testAudio";

import {
  View,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  StyleSheet,
  Text
} from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
const { width, height } = Dimensions.get("window");
import ScoreModal from "./model";

const Quiz = props => {
  const navigation = useNavigation();
  // const [totalScore, setTotalScore, index, setIndex] = useContext(QuizContext);
  // console.log(totalScore);

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
  console.log(questions);

  const allQuestions = questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(true);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [error, setError] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"]
  });

  useEffect(() => {
    // handleResetQuiz();
    // handleNext2();
    // console.log(score);
    // setScore((score = score || 0));
    // allQuestions[currentQuestionIndex].questionType == "ChoiceTextNoAudio",
    // allQuestions[index];
    // speakQuestion(allQuestions[currentQuestionIndex]?.question);
    // console.log(allQuestions[currentIndex]);
    // }, [allQuestions[currentQuestionIndex]?.question]);
  }, []);

  // const speakQuestion = () => {
  //   Speech.speak(allQuestions[currentQuestionIndex]?.question);
  //   // Speech.speak(text);
  // };

  // const validateAnswer = selectedOption => {
  //   setCurrentOptionSelected(selectedOption);
  //   setIsOptionsDisabled(true);
  //   setShowAnswer(true);
  //   if (selectedOption.is_correct_choice) {
  //     // var testing = isNaN(score);
  //     // console.log("testing ", testing, score);
  //     // setScore(1);
  //     setScore(parseInt(score)) + parseInt(1);
  //     setCorrectOption(selectedOption.id);
  //   }
  //   setShowNextButton(true);
  // };

  const handleResetQuiz = () => {
    const data = {
      index: 0,
      score: 0,
      totalQuestions: questions.length
    };
    props.handleStart(data);
    // console.log("submitting redux");
  };

  const validateAnswer = () => {
    setIsOptionsDisabled(true);
    setShowAnswer(true);
    setScore(score + 1);
    console.log(score);
    setShowNextButton(true);
  };

  const handleSubmitTest = () => {
    setShowScoreModal(true);
    try {
      // unitId
      const data = {
        username,
        lessonId,
        score
      };
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

  const handleNext = () => {
    setShowAnswer(false);
    console.log("trigerring");
    // console.log("all q", allQuestions.length);
    if (currentQuestionIndex == allQuestions.length - 1) {
      // setShowScoreModal(true);
      console.log("last q");
    } else {
      console.log("not last");
      handleNext2();
      // setCurrentQuestionIndex(currentQuestionIndex + 1);
      // setCurrentOptionSelected(null);
      // setCorrectOption(null);
      // setIsOptionsDisabled(false);
      // setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start();
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
    // console.log(words2);
    return words2;
  };

  const handleNext2 = () => {
    const index = props.index;
    const score = props.score;
    const data = {
      index: index + 1,
      score: score + 1,
      totalQuestions: allQuestions.length
    };
    props.handleNext1(data);
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
        progressIndex={progress}
        allQuestionsLength={allQuestions.length}
      />
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 16,
          // backgroundColor: COLORS.white,
          position: "relative"
          // backgroundColor: "red"
        }}
      >
        {/* ///render options start  */}
        {allQuestions[props.index].questionType.type === "CHOICE" ? (
          <>
            {allQuestions[props.index].questionType.assetType === "TEXT" ? (
              <>
                <TextChoices
                  numberOfQuestions={allQuestions.length - 1}
                  showNextButton={showNextButton}
                  // handleNext={handleNext}
                  title={allQuestions[props.index].title}
                  question={allQuestions[props.index].question}
                  showAnswer={showAnswer}
                  correctOption={correctOption}
                  validateAnswer={validateAnswer}
                  isOptionsDisabled={isOptionsDisabled}
                  currentOptionSelected={currentOptionSelected}
                  Choices={allQuestions[props.index].text_choices}
                  has_audio={
                    allQuestions[props.index].questionType.type.has_audio
                  }
                />
              </>
            ) : allQuestions[props.index].questionType.assetType === "PHOTO" ? (
              <>
                <PhotOptions
                  showNextButton={showNextButton}
                  numberOfQuestions={allQuestions.length - 1}
                  // handleNext={handleNext}
                  title={allQuestions[props.index].title}
                  question={allQuestions[props.index].question}
                  showAnswer={showAnswer}
                  validateAnswer={validateAnswer}
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
              // handleNext={handleNext}
              validateAnswer={validateAnswer}
            />
          </>
        ) : null}

        {/* {allQuestions[currentQuestionIndex].has_audio ? (
          <AudioPlayerWiouthControl
            mp3={allQuestions[currentQuestionIndex].audio}
          />
        ) : null} */}

        {/* Score Modal */}
        {showScoreModal ? (
          <ScoreModal
            qlength={allQuestions.length}
            score={score}
            showScoreModal={showScoreModal}
            handleSubmitTest={handleSubmitTest}
            restartQuiz={restartQuiz}
          />
        ) : null}
      </View>
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
    handleNext1: data => dispatch(handleNext(data)),
    handleStart: data => dispatch(handleStart(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import { createASNT } from "../../store/actions/assignments";
import { useNavigation } from "@react-navigation/native";
import AudioPlayerWiouthControl from "../../Helpers/PlayerWithoutControl";
import { useTheme } from "react-native-paper";
import * as Speech from "expo-speech";
import Qustion from "./Question";
import ProgressBar from "./Progress";
import Progress from "./DaragAndDrop/Header";
import PhotOptions from "./MultipleChoice/PhotoOption";
import TextChoices from "./MultipleChoice/TextOptions";
import NextButton from "./NextButton";
// import NextButton from "./MultipleChoice/HandleNext";

// import Test from "../../Helpers/testAudio";

import {
  View,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  StyleSheet
} from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
const { width, height } = Dimensions.get("window");
import ScoreModal from "./model";

// import { localhost } from "../../Helpers/urls";
// import { authAxios } from "../../Helpers/authAxios";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Icon from "react-native-vector-icons/AntDesign";

const Quiz = props => {
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
  // console.log(sectionId);

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
    speakQuestion(allQuestions[currentQuestionIndex]?.question);
  }, [allQuestions[currentQuestionIndex]?.question]);

  const speakQuestion = () => {
    Speech.speak(allQuestions[currentQuestionIndex]?.question);
    // Speech.speak(text);
  };

  const validateAnswer = selectedOption => {
    setCurrentOptionSelected(selectedOption);
    setIsOptionsDisabled(true);
    setShowAnswer(true);
    if (selectedOption.is_correct_choice) {
      // console.log(score);
      setScore(score + 1);
      // console.log("score", score);
      setCorrectOption(selectedOption.id);
    }
    // Show Next Button
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
      props.createASNT(token, data);
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
    // console.log(showScoreModal);
    setShowAnswer(false);
    if (currentQuestionIndex == allQuestions.length - 1) {
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
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

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      {/* <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} /> */}
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: COLORS.white,
          position: "relative"
        }}
      >
        {/* {renderProgressBar()} */}
        <View style={{ flex: 1 }}>
          <ProgressBar
            progressIndex={progress}
            allQuestionsLength={allQuestions.length}
          />
        </View>

        {/* {renderQuestion()} */}
        <View
          style={{ flex: 4, justifyContent: "center", alignSelf: "center" }}
        >
          <Qustion
            TitleQuestion={allQuestions[currentQuestionIndex]?.question}
          />
        </View>

        {/* {renderOptions() photo choices  */}
        {allQuestions[currentQuestionIndex].has_photo_choices ? (
          <View style={{ flex: 12 }}>
            <PhotOptions
              showAnswer={showAnswer}
              validateAnswer={validateAnswer}
              Photos={allQuestions[currentQuestionIndex].photo_choices}
            />
          </View>
        ) : null}
        {/* {renderOptions() text choices  */}
        {allQuestions[currentQuestionIndex].has_text_choices ? (
          <View style={{ flex: 12 }}>
            <TextChoices
              showAnswer={showAnswer}
              correctOption={correctOption}
              validateAnswer={validateAnswer}
              isOptionsDisabled={isOptionsDisabled}
              currentOptionSelected={currentOptionSelected}
              correctOption={3}
              Choices={allQuestions[currentQuestionIndex].text_choices}
            />
          </View>
        ) : null}

        {/* Next Button */}
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <NextButton
            showNextButton={showNextButton}
            handleNext={handleNext}
            speakQuestion={speakQuestion}
          />
        </View>
        {/* render audio */}

        {allQuestions[currentQuestionIndex].has_audio ? (
          <AudioPlayerWiouthControl
            mp3={allQuestions[currentQuestionIndex].audio}
          />
        ) : null}

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
    username: state.auth.username
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createASNT: (token, asnt) => dispatch(createASNT(token, asnt))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  TopContainer: {
    flex: 6
  },
  BottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  ImgWrapper: {
    width: 100,
    height: 50
  },
  option_photo: {
    width: width * 0.4,
    height: 160,
    borderRadius: 5,
    margin: 5,
    borderColor: "red"
  },
  ImgContianer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

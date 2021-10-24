import React, { useState } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import { createASNT } from "../../store/actions/assignments";
import { useNavigation } from "@react-navigation/native";
import AudioPlayerWiouthControl from "../../Helpers/PlayerWithoutControl";
// import Test from "../../Helpers/testAudio";

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  StyleSheet
} from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
const { width, height } = Dimensions.get("window");

// import { localhost } from "../../Helpers/urls";
// import { authAxios } from "../../Helpers/authAxios";
import ScoreModal from "./model";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Quiz = props => {
  const navigation = useNavigation();

  const { questions, testID, token, username, lessonId, unitId } = props;
  // console.log(questions);

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

  const validateAnswer = selectedOption => {
    // console.log(selectedOption.is_correct_choice);
    // console.log(allQuestions[currentQuestionIndex]["answer"]);
    // let correct_option = allQuestions[currentQuestionIndex]["answer"];
    setCurrentOptionSelected(selectedOption);
    setIsOptionsDisabled(true);
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
      navigation.navigate("Unit Details", { id: unitId });

      // setTimeout(() => {
      //   navigation.navigate("Unit Details", { id: unitId });
      // }, 2000);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleNext = () => {
    // console.log(showScoreModal);
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
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

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40
        }}
      >
        {/* Question */}
        <Text
          style={{
            color: COLORS.white,
            fontSize: 16
          }}
        >
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex].has_photo_choices ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {allQuestions[currentQuestionIndex].photo_choices.map(option => (
              <TouchableOpacity
                key={option.id}
                onPress={() => validateAnswer(option)}
              >
                {/* <View style={styles.ImgWrapper}> */}
                <Image
                  style={styles.option_photo}
                  source={{ uri: option.photo }}
                />
                {/* </View> */}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <>
            {allQuestions[currentQuestionIndex]?.text_choices.map(option => (
              <TouchableOpacity
                onPress={() => validateAnswer(option)}
                disabled={isOptionsDisabled}
                key={option.id}
                style={{
                  borderWidth: 3,
                  borderColor:
                    option.id == correctOption
                      ? COLORS.success
                      : option.id == currentOptionSelected
                      ? COLORS.error
                      : COLORS.secondary + "40",
                  backgroundColor:
                    option == correctOption
                      ? COLORS.success + "20"
                      : option == currentOptionSelected
                      ? COLORS.error + "20"
                      : COLORS.secondary + "20",
                  height: 60,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  marginVertical: 10
                }}
              >
                <Text style={{ fontSize: 13, color: COLORS.white }}>
                  {option.title}
                </Text>

                {/* Show Check Or Cross Icon based on correct answer*/}
                {option.id == correctOption ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: COLORS.success,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <MaterialCommunityIcons
                      name="check"
                      style={{
                        color: COLORS.white,
                        fontSize: 20
                      }}
                    />
                  </View>
                ) : option.id == currentOptionSelected ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: COLORS.error,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      style={{
                        color: COLORS.white,
                        fontSize: 20
                      }}
                    />
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
            {/* text choices emd   */}
          </>
        )}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <>
          {/* {currentQuestionIndex == allQuestions.length - 1 ? (
            <TouchableOpacity
              onPress={handleSubmitTest}
              style={{
                marginTop: 20,
                width: "100%",
                backgroundColor: COLORS.accent,
                padding: 20,
                borderRadius: 5
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.white,
                  textAlign: "center"
                }}
              >
                Submit
              </Text>
            </TouchableOpacity> */}

          <TouchableOpacity
            onPress={handleNext}
            style={{
              marginTop: 20,
              width: "100%",
              backgroundColor: COLORS.accent,
              padding: 20,
              borderRadius: 5
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: COLORS.white,
                textAlign: "center"
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"]
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 1,
          borderRadius: 5,
          backgroundColor: "#00000020"
        }}
      >
        <Animated.View
          style={[
            {
              height: 1,
              borderRadius: 5,
              backgroundColor: COLORS.accent
            },
            {
              width: progressAnim
            }
          ]}
        ></Animated.View>
      </View>
    );
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
          backgroundColor: COLORS.background,
          position: "relative"
        }}
      >
        {/* ProgressBar */}
        <View style={{ flex: 1 }}>{renderProgressBar()}</View>

        <View style={{ flex: 4 }}>
          {/* Question */}
          {renderQuestion()}
        </View>

        {/* Options */}
        <View style={{ flex: 12 }}>{renderOptions()}</View>

        {/* Next Button */}
        <View style={{ flex: 3 }}>{renderNextButton()}</View>
        {/* audi */}

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
    width: 90,
    height: 40
    // margin: 5
    // marginTop: 5
    // marginBottom: 25
  },
  option_photo: {
    width: width * 0.4,
    height: 150,
    borderRadius: 5,
    margin: 5
  },
  ImgContianer: {
    // width: "100%",
    // height: "75%",
    // display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

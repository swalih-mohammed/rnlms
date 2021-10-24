import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { createASNT } from "../../store/actions/assignments";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated
} from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
// import { localhost } from "../../Helpers/urls";
// import { authAxios } from "../../Helpers/authAxios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Quiz = props => {
  const navigation = useNavigation();

  const { questions, testID, token, username } = props;
  // console.log(questions);

  const allQuestions = questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [error, setError] = useState(false);

  const validateAnswer = selectedOption => {
    // console.log(allQuestions[currentQuestionIndex]["answer"]);
    let correct_option = allQuestions[currentQuestionIndex]["answer"];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      console.log(score);
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };

  const handleSubmitTest = () => {
    try {
      // unitId
      const data = {
        username,
        testID,
        score
      };
      props.createASNT(token, data);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    navigation.navigate("UnitDetail", { id: testID });
  };

  const handleNext = () => {
    console.log(showScoreModal);
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      // setShowScoreModal(true);
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
            fontSize: 30
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
        {allQuestions[currentQuestionIndex]?.choices.map(option => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? COLORS.success
                  : option == currentOptionSelected
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
            <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>

            {/* Show Check Or Cross Icon based on correct answer*/}
            {option == correctOption ? (
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
            ) : option == currentOptionSelected ? (
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
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <>
          {currentQuestionIndex == allQuestions.length - 1 ? (
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
            </TouchableOpacity>
          ) : (
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
          )}
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
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020"
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
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
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
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
        {renderProgressBar()}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}

        {/* Score Modal */}

        {/* Background Image */}
        {/* <Image
          source={require("../assets/images/DottedBG.png")}
          style={{
            width: SIZES.width,
            height: 130,
            zIndex: -1,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.5
          }}
          resizeMode={"contain"}
        /> */}
      </View>
    </SafeAreaView>
  );
};

// export default Quiz;

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    // currentAssignment: state.assignments.currentAssignment,
    // loading: state.assignments.loading,
    username: state.auth.username
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // getASNTSDetail: (token, id) => dispatch(getASNTSDetail(token, id)),
    createASNT: (token, asnt) => dispatch(createASNT(token, asnt))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);

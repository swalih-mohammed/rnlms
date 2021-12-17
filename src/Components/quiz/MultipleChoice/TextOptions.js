import React, { useState } from "react";
import { connect } from "react-redux";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text
} from "react-native";
const { width, height } = Dimensions.get("window");
import NextButton from "../NextButton";

import { COLORS, SIZES } from "../../../Helpers/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/AntDesign";
import { handleNext, handleValidate } from "../../../store/actions/quiz";

const renderOptions = props => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const { Choices, title, question, numberOfQuestions } = props;

  const handleNextQiz = () => {
    if (props.index !== numberOfQuestions) {
      const data = {
        index: props.index + 1
      };
      props.handleNext(data);
    }
  };

  const handleValidateQuiz = option => {
    setShowAnswer(true);
    setOptionsDisabled(true);
    setShowNextButton(true);
    const score = option.is_correct_choice ? 1 : 0;
    console.log(score);
    const data = {
      score: props.score + score
    };
    props.handleValidate(data);
  };

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          flex: 2,
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            color: COLORS.black,
            fontSize: 20,
            paddingBottom: 35
          }}
        >
          {title ? title : null}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 16
          }}
        >
          {question ? question : null}
        </Text>
      </View>
      <View
        style={{
          flex: 4
        }}
      >
        {Choices.map(option => (
          <TouchableOpacity
            onPress={() => handleValidateQuiz(option)}
            disabled={optionsDisabled}
            key={option.id}
            style={{
              borderWidth: 3,
              borderColor:
                showAnswer && option.is_correct_choice
                  ? COLORS.success
                  : showAnswer && !option.is_correct_choice
                  ? COLORS.error
                  : COLORS.secondary + "40",

              height: 60,
              borderRadius: 14,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
              marginVertical: 5
            }}
          >
            <Text style={{ fontSize: 14, color: "black" }}>{option.title}</Text>

            {/* Show Check Or Cross Icon based on correct answer*/}
            {showAnswer && option.is_correct_choice ? (
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
            ) : showAnswer && !option.is_correct_choice ? (
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

      <View
        style={{
          flex: 1.5
        }}
      >
        <TouchableOpacity onPress={() => console.log(123)}>
          <Icon
            name="sound"
            style={{
              color: "black",
              fontSize: 30,
              alignSelf: "center"
            }}
          />
        </TouchableOpacity>
        <NextButton
          showNextButton={showNextButton}
          handleNext={handleNextQiz}
          // speakQuestion={speakQuestion}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  option_photo: {
    width: width * 0.4,
    height: 160,
    borderRadius: 5,
    margin: 5,
    borderColor: "red"
  }
});

const mapStateToProps = state => {
  return {
    index: state.quiz.index,
    score: state.quiz.score
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleNext: data => dispatch(handleNext(data)),
    handleValidate: data => dispatch(handleValidate(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(renderOptions);

import React, { useState } from "react";
import { connect } from "react-redux";

import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View
} from "react-native";
import { View as MotiView } from "moti";
import { Button } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import { COLORS, SIZES } from "../../../Helpers/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/AntDesign";
import { handleNext, handleValidate } from "../../../store/actions/quiz";

const renderOptions = props => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);

  const { Choices, title, question, numberOfQuestions } = props;

  const handleNextQuiz = () => {
    const data = {
      index: props.index !== numberOfQuestions ? props.index + 1 : props.index,
      showAnswer: false,
      answerList: null,
      showScoreModal: props.index === numberOfQuestions ? true : false
    };
    props.handleNext(data);
  };

  const handleValidateQuiz = option => {
    setShowAnswer(true);
    setOptionsDisabled(true);
    const score = option.is_correct_choice ? 1 : 0;
    const data = {
      score: props.score + score
    };
    props.handleValidate(data);
  };

  return (
    <MotiView
      style={{
        flex: 1,
        justifyContent: "center"
      }}
      from={{ opacity: 0, translateX: 500 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        type: "timing"
      }}
    >
      <View
        style={{
          flex: 2,
          justifyContent: "space-around",
          alignItems: "center"
          // backgroundColor: "red"
        }}
      >
        <Text
          style={{
            color: COLORS.black,
            fontSize: 18,
            paddingTop: 35
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
          flex: 3.5,
          // backgroundColor: "green",
          marginHorizontal: 5
        }}
      >
        {Choices.map(option => (
          <TouchableOpacity
            onPress={() => handleValidateQuiz(option)}
            disabled={optionsDisabled}
            key={option.id}
            style={{
              borderWidth: 1,
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
              // width: SIZES.width - 10
            }}
          >
            <Text style={{ fontSize: 14, color: "black" }}>{option.title}</Text>

            {/* Show Check Or Cross Icon based on correct answer*/}
            {showAnswer && option.is_correct_choice ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  backgroundColor: COLORS.success,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <MaterialCommunityIcons
                  name="check"
                  style={{
                    color: COLORS.white,
                    fontSize: 10
                  }}
                />
              </View>
            ) : showAnswer && !option.is_correct_choice ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  backgroundColor: COLORS.error,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  style={{
                    color: COLORS.white,
                    fontSize: 10
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1.5
          // backgroundColor: "red"
        }}
      >
        <TouchableOpacity onPress={() => console.log(123)}>
          <Icon
            name="sound"
            style={{
              color: "black",
              fontSize: 30,
              paddingBottom: 50
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          flex: 1
        }}
      >
        <Button
          mode="contained"
          onPress={handleNextQuiz}
          disabled={!showAnswer}
          style={{ paddingBottom: 10, paddingTop: 10 }}
        >
          {showAnswer ? "NEXT" : "SELECT"}
        </Button>
      </View>
    </MotiView>
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
    score: state.quiz.score,
    showAnswer: state.quiz.showAnswer,
    showScoreModal: state.quiz.showAnswer
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

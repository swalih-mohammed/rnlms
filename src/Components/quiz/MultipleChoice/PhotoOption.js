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
import Icon from "react-native-vector-icons/AntDesign";

import { COLORS, SIZES } from "../../../Helpers/constants";
import { MARGIN_TOP } from "../DaragAndDrop/Layout";
import NextButton from "../NextButton";
import {
  handleStart,
  handleValidate,
  handleNext
} from "../../../store/actions/quiz";

const renderOptions = props => {
  const {
    title,
    question,
    Photos,
    // validateAnswer,
    // showAnswer,
    showNextButton,
    // handleNext,
    // has_audio,
    numberOfQuestions
  } = props;

  const [showAnswer, setShowAnswer] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);

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
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        <Text
          style={{
            color: COLORS.black,
            fontSize: 20
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          flex: 3
        }}
      >
        {Photos.map(option => (
          <TouchableOpacity
            key={option.id}
            disabled={optionsDisabled}
            onPress={() => handleValidateQuiz(option)}
            style={{
              borderWidth: 3,
              borderColor:
                showAnswer && option.is_correct_choice
                  ? COLORS.success
                  : showAnswer && !option.is_correct_choice
                  ? COLORS.error
                  : COLORS.secondary + "40"
            }}
          >
            <Image
              style={styles.option_photo}
              source={{ uri: option.photo.photo }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flex: 1.5
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={() => console.log(123)}>
            <Icon
              name="sound"
              style={{
                color: "black",
                fontSize: 30,
                paddingBottom: 10
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 20
            }}
          >
            {question}
          </Text>
        </View>

        <View style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}>
          <NextButton
            showNextButton={showNextButton}
            handleNext={handleNextQiz}
            // speakQuestion={speakQuestion}
          />
        </View>
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

// export default renderOptions;
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

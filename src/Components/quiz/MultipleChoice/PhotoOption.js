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
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/AntDesign";
// import { View as MotiView } from "moti";
import { COLORS, SIZES } from "../../../Helpers/constants";
import { MARGIN_TOP } from "../DaragAndDrop/Layout";
import { Button } from "react-native-paper";
import LottieView from "lottie-react-native";
// import Loader from "../../Utils/Loader";

import Animated, { LightSpeedInRight } from "react-native-reanimated";

import {
  handleStart,
  handleValidate,
  handleNext
} from "../../../store/actions/quiz";

const renderOptions = props => {
  const animation = React.useRef(null);

  const { title, question, Photos } = props;

  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, SetSelectedAnswer] = useState(null);
  const [scored, setScored] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));

  const handleNextQuiz = () => {
    SetSelectedAnswer(null);
    setScored(false);
    const data = {
      index:
        props.index !== props.numberOfQuestions ? props.index + 1 : props.index,
      showAnswer: false,
      answerList: null,
      showScoreModal: props.index === props.numberOfQuestions ? true : false
    };
    props.handleNext(data);
    Animated.timing(progress, {
      toValue: props.index + 1,
      duration: 5000,
      useNativeDriver: false
    }).start();
  };

  const handleValidateQuiz = option => {
    setShowAnswer(true);
    setOptionsDisabled(true);
    SetSelectedAnswer(option.id);
    setScored(option.is_correct_choice ? true : false);
    const score = option.is_correct_choice ? 1 : 0;
    const data = {
      score: props.score + score
    };
    setShowMessage(true);
    if (showMessage) {
      animation.current.play(0, 100);
    }
    props.handleValidate(data);
    setTimeout(() => setShowMessage(false), 1000);
  };

  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={LightSpeedInRight.duration(1000)}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        {showMessage ? (
          <LottieView
            ref={animation}
            source={
              scored
                ? require("../../../../assets/lotties/happy_emoji.json")
                : require("../../../../assets/lotties/sad_emoji.json")
            }
            autoPlay={true}
            loop={false}
          />
        ) : null}

        <Text
          style={{
            color: COLORS.black,
            fontSize: 20,
            paddingTop: 25
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          flex: 3.5,
          justifyContent: "center"
        }}
      >
        {Photos.map(option => (
          <TouchableOpacity
            key={option.id}
            disabled={optionsDisabled}
            onPress={() => handleValidateQuiz(option)}
            style={{
              borderWidth: 1,
              margin: 5,
              opacity: !showAnswer ? 1 : option.id === selectedAnswer ? 1 : 0.6,
              borderColor:
                showAnswer && option.is_correct_choice
                  ? COLORS.success
                  : showAnswer && !option.is_correct_choice
                  ? COLORS.error
                  : COLORS.primary
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
          flex: 1.5,
          alignItems: "center",
          justifyContent: "center"
          // backgroundColor: "black"
        }}
      >
        <View
          style={{
            // justifyContent: "flex-",
            alignItems: "center",
            // backgroundColor: "red",
            flex: 1
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              paddingBottom: 25
            }}
          >
            {question}
          </Text>
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
        </View>

        <View
          style={{
            position: "absolute",
            // paddingBottom: 10,
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
      </View>
    </Animated.View>
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

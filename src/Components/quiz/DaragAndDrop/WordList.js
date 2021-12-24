/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useState, useContext } from "react";
import { connect } from "react-redux";
import { handleValidate, handleNext } from "../../../store/actions/quiz";
import { StyleSheet, Dimensions, Text, View } from "react-native";
import { View as MotiView } from "moti";
import { RectButton } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import Animated, {
  useSharedValue,
  runOnUI,
  runOnJS
} from "react-native-reanimated";
import { LightSpeedInRight } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import SortableWord from "./SortableWord.js";
import Lines from "./Lines";
import { MARGIN_LEFT } from "./Layout";
// import { DulingoContext } from "./DulingoContext";

// import { QuizContext } from "../QuizContext";
// import { createPath } from "react-native-redash";
const containerWidth = Dimensions.get("window").width - MARGIN_LEFT * 2;
const containerHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 4
    // margin: MARGIN_LEFT,
    // backgroundColor: "green"
  },
  row: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    opacity: 0,
    backgroundColor: "red"
  },
  button: {
    backgroundColor: "#59CB01",
    width: "100%",
    height: 45,
    borderRadius: 16,
    justifyContent: "center"
    // top: 500
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  }
});

const WordList = props => {
  const animation = React.useRef(null);

  const [ready, setReady] = useState(false);
  const [scored, setScored] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const offsets = props.children.map(() => ({
    pre_space: useSharedValue(0),
    post_space: useSharedValue(0),
    word: useSharedValue(0),
    word_id: useSharedValue(0),
    tags: useSharedValue(0),
    isCorrect: useSharedValue(false),
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0)
  }));

  const handleNextQuiz = () => {
    const data = {
      index:
        props.index !== props.numberOfQuestions ? props.index + 1 : props.index,
      showAnswer: false,
      answerList: null,
      showScoreModal: props.index === props.numberOfQuestions ? true : false
    };

    props.handleNext(data);
  };

  const handleValidateQuiz = (passed, correctAnswerIdList) => {
    setScored(passed ? true : false);
    const data = {
      score: passed ? props.score + 1 : props.score,
      showAnswer: true,
      answerList: correctAnswerIdList ? correctAnswerIdList : null
    };
    setShowMessage(true);
    if (showMessage) {
      animation.current.play(0, 100);
    }
    props.handleValidate(data);
    setTimeout(() => setShowMessage(false), 1000);
  };

  const checkAnswer = () => {
    // console.log(123);
    // handleValidateQuiz();
    // console.log("trigerring");
    if (offsets && props.type === "NotPos") {
      // console.log(props.type);
      // setCheck(false);
      const answerBank = offsets.filter(o => o.order.value !== -1);
      answerBank.sort(
        (a, b) => parseFloat(a.order.value) - parseFloat(b.order.value)
      );
      // props.validateAnswer();
      var userSentance = "";
      for (let i = 0; i < answerBank.length; i++) {
        userSentance += answerBank[i].pre_space.value;
        userSentance += answerBank[i].word.value;
        userSentance += answerBank[i].post_space.value;
      }
      // console.log(userSentance);
      if (userSentance.trim() === props.answer.trim()) {
        // console.log("correct");
        handleValidateQuiz(true, null);
      } else {
        // console.log("not correct");
        handleValidateQuiz(false, null);
      }
    }

    ///   pos question ////////////////
    if (offsets && props.type !== "NotPos") {
      const totalCorrectWords = [];
      for (let i = 0; i < offsets.length; i++) {
        const tags = offsets[i].tags.value;
        if (tags.includes(props.type)) {
          // console.log("pos", props.type);
          totalCorrectWords.push(offsets[i].word_id.value);
        }
      }
      const TotalCorrectAnswer = totalCorrectWords.length;
      // console.log("totalCurrect answer", TotalCorrectAnswer);
      /// find the score of the user
      const sentance = offsets.filter(o => o.order.value !== -1);
      const correctAnswerIdList = [];
      if (sentance.length > 0) {
        for (let i = 0; i < sentance.length; i++) {
          const tags = sentance[i].tags.value;
          // console.log(sentance[i].word.value, tags);
          if (tags.includes(props.type)) {
            correctAnswerIdList.push(sentance[i].word_id.value);
          }
        }
      }
      // console.log(correctAnswerIdList);
      const userScore = correctAnswerIdList.length / TotalCorrectAnswer;
      // console.log("user score", userScore);
      if (userScore > 0.8) {
        // console.log("correct");
        handleValidateQuiz(true, totalCorrectWords);
      } else {
        // console.log("not correct");
        // console.log(totalCorrectWords);
        handleValidateQuiz(false, totalCorrectWords);
      }
    }
  };

  if (!ready) {
    return (
      <View style={styles.row}>
        {props.children.map((child, index) => {
          return (
            <View
              key={index}
              onLayout={({
                nativeEvent: {
                  layout: { x, y, width, height }
                }
              }) => {
                const offset = offsets[index];
                // console.log(child);
                offset.pre_space.value = child.props.pre_space;
                offset.post_space.value = child.props.post_space;
                offset.word.value = child.props.word;
                offset.tags.value = child.props.tags;
                offset.word_id.value = child.props.id;
                offset.order.value = -1;
                offset.width.value = width + 5;
                offset.height.value = height;
                offset.originalX.value = x;
                offset.originalY.value = y;
                runOnUI(() => {
                  "worklet";
                  if (offsets.filter(o => o.order.value !== -1).length === 0) {
                    runOnJS(setReady)(true);
                  }
                })();
              }}
            >
              {child}
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <>
      <Animated.View
        entering={LightSpeedInRight.duration(1000)}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 18, paddingTop: 25 }}>{props.title}</Text>
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
        {/* <Text style={{ fontSize: 20 }}>{correctAnswerList.length}</Text> */}
      </Animated.View>
      <Animated.View
        style={{ flex: 4 }}
        entering={LightSpeedInRight.duration(1000)}
      >
        <Lines />
        {props.children.map((child, index) => (
          <SortableWord
            key={index}
            offsets={offsets}
            index={index}
            containerWidth={containerWidth}
            // correctAnswerWordIdList={correctAnswerWordIdList}
          >
            {child}
          </SortableWord>
        ))}
      </Animated.View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            // backgroundColor: "red",
            flex: 1
          }}
        >
          <Button
            // mode="contained"
            mode={props.showAnswer ? "contained" : "outlined"}
            onPress={
              props.showAnswer ? () => handleNextQuiz() : () => checkAnswer()
            }
            // disabled={!props.showAnswer}
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            {props.showAnswer ? "NEXT" : "CHECK"}
          </Button>
        </View>
      </View>
    </>
  );
};

// export default WordList;
const mapStateToProps = state => {
  return {
    index: state.quiz.index,
    score: state.quiz.score,
    showAnswer: state.quiz.showAnswer,
    showScoreModal: state.quiz.showScoreModal
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
)(WordList);

/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useState, useContext } from "react";
import { connect } from "react-redux";
import { handleValidate, handleNext } from "../../../store/actions/quiz";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { useSharedValue, runOnUI, runOnJS } from "react-native-reanimated";
import SortableWord from "./SortableWord.js";
import Lines from "./Lines";
import { MARGIN_LEFT } from "./Layout";
import { DulingoContext } from "./DulingoContext";

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
  const [ready, setReady] = useState(false);
  const [check, setCheck] = useState(true);
  console.log(props.numberOfQuestions);
  // const [
  //   totalScore,
  //   setTotalScore,
  //   correctAnswerList,
  //   setCorrectAnswerList,
  //   currentIndex,
  //   setCurrentIndex,
  //   score,
  //   setScore
  // ] = useContext(QuizContext);
  const [correctAnswerWordIdList, setCorrectAnswerWordIdList] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  // console.log(props);
  const [
    correctAnswerList,
    setCorrectAnswerList,
    setShowResult,
    showResult
  ] = useContext(DulingoContext);
  // const [isUserAnswerCorrect, SetIsUserAnswerCorrect] = useState(false);
  // console.log(showResult);
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

  const checkAnswer = () => {
    console.log(props.type);
    if (offsets && props.type !== "NotPos") {
      console.log(props.type);
      setCheck(false);
      const answerBank = offsets.filter(o => o.order.value !== -1);
      answerBank.sort(
        (a, b) => parseFloat(a.order.value) - parseFloat(b.order.value)
      );
      props.validateAnswer();
      var userSentance = "";
      for (let i = 0; i < answerBank.length; i++) {
        userSentance += answerBank[i].pre_space.value;
        userSentance += answerBank[i].word.value;
        userSentance += answerBank[i].post_space.value;
      }
      console.log(userSentance);
      if (userSentance.trim() === props.answer.trim()) {
        props.validateAnswer;
        console.log("correct");
      } else {
        console.log("not correct");
      }
    }

    ///   pos question ////////////////
    if (offsets && props.type !== "NotPos") {
      console.log(props.type);

      setCheck(false);
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
      const sentance = offsets.filter(o => o.order.value !== -1);
      if (sentance.length > 0) {
        const correctAnswerIdList = [];
        for (let i = 0; i < sentance.length; i++) {
          const tags = sentance[i].tags.value;
          if (tags.includes(props.type)) {
            correctAnswerIdList.push(sentance[i].word_id.value);
          }
        }
        setCorrectAnswerList(correctAnswerIdList);
        const userScore = correctAnswerIdList.length / TotalCorrectAnswer;
        // console.log(userScore);
        if (userScore > 0.8) {
          console.log("correct", userScore);
          // console.log(correctAnswerIdList);
          // props.validateAnswer();
          // handleNext2();
          console.log("correct");
          handleValidateQuiz();
        } else {
          console.log("not correct");
        }
      }
    }
  };

  const handleNextQiz = () => {
    if (props.index !== numberOfQuestions) {
      const data = {
        index: props.index + 1
      };
      props.handleNext(data);
    }
  };

  const handleValidateQuiz = () => {
    setShowAnswer(true);
    // setOptionsDisabled(true);
    // const score = option.is_correct_choice ? 1 : 0;
    // console.log(score);
    const data = {
      score: props.score + 1
    };
    props.handleValidate(data);
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>{props.title}</Text>
        {/* <Text style={{ fontSize: 20 }}>{correctAnswerList.length}</Text> */}
      </View>
      <View style={{ flex: 4 }}>
        <Lines />
        {props.children.map((child, index) => (
          <SortableWord
            key={index}
            offsets={offsets}
            index={index}
            containerWidth={containerWidth}
            correctAnswerWordIdList={correctAnswerWordIdList}
          >
            {child}
          </SortableWord>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        {/* <RectButton
          style={styles.button}
          onPress={check ? checkAnswer : props.handleNext}
          // onPress={check ? checkAnswer : checkAnswer}
        >
          <Text style={styles.label}>{check ? "CHECK" : "NEXT"}</Text>
        </RectButton> */}
        {check ? (
          <RectButton style={styles.button} onPress={handleValidateQuiz}>
            <Text style={styles.label}>{"CHECK"}</Text>
          </RectButton>
        ) : (
          <RectButton style={styles.button} onPress={handleNextQiz}>
            <Text style={styles.label}>{"NEXT"}</Text>
          </RectButton>
        )}
      </View>
    </>
  );
};

// export default WordList;
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
)(WordList);

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
import { View as MotiView, SafeAreaView } from "moti";

const { width, height } = Dimensions.get("window");

import { Button, Title } from "react-native-paper";

import { COLORS, SIZES } from "../../../Helpers/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/AntDesign";
import { handleNext, handleValidate } from "../../../store/actions/quiz";
import Animated, { LightSpeedInRight } from "react-native-reanimated";
import LottieView from "lottie-react-native";

const renderOptions = props => {
  const animation = React.useRef(null);

  const { title, question, answer, numberOfQuestions } = props;
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [scored, setScored] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedA, setSelectedA] = useState(null);
  const [completedA, setCompletedA] = useState([]);
  const [completedB, setCompletedB] = useState([]);
  const [scoredIds, setScoredIds] = useState([]);
  const [aDisabled, setADisabled] = useState(false);
  const [bDisabled, setBDisabled] = useState(false);

  const handleCompletedA = id => {
    setADisabled(true);
    setBDisabled(false);
    setSelectedA(id);
    const updatedArr = [...completedA, id];
    setCompletedA(updatedArr);
    // checkIfInBucketA(id);
    // console.log(completedA);
  };
  const handleCompletedB = id => {
    if (id === selectedA) {
      setScore(score + 1);
      setSelectedA(null);
      const updatedArr = [...scoredIds, id];
      setScoredIds(updatedArr);
    }
    setBDisabled(true);
    setADisabled(false);
    const updatedArr = [...completedB, id];
    setCompletedB(updatedArr);
  };

  const checkIfInBucketA = id => {
    // console.log("triggering");
    if (completedA.length > 0 && completedA.includes(id)) {
      return true;
    } else {
      return false;
    }
  };
  const checkIfInBucketB = id => {
    if (completedB.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  const checkIfInScoredIds = id => {
    if (scoredIds.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  const handleNextQuiz = () => {
    const data = {
      index: props.index !== numberOfQuestions ? props.index + 1 : props.index,
      showAnswer: false,
      answerList: null,
      showScoreModal: props.index === numberOfQuestions ? true : false
    };
    // console.log(data);
    props.handleNext(data);
  };

  const handleValidateQuiz = () => {
    setShowAnswer(true);
    // setShowNextButton(true);
    const userScore = score / completedA.length;
    setScored(userScore > 0.8 ? true : false);
    const data = {
      score: userScore > 0.8 ? props.score + 1 : props.score
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
          flex: 1,
          // justifyContent: "center",
          alignItems: "center"
          // backgroundColor: "green"
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, color: "black" }}>{title}</Text>
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
        </View>
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: "row",
          // backgroundColor: "green",
          justifyContent: "center",
          marginHorizontal: 5,
          marginVertical: 5
        }}
      >
        <View
          style={{
            width: width / 2 - 20,
            // backgroundColor: "red",
            marginHorizontal: 5
          }}
        >
          {props.BucketA &&
            props.BucketA.map(item => (
              <TouchableOpacity
                onPress={() => handleCompletedA(item.key)}
                disabled={checkIfInBucketA(item.key) || aDisabled}
                key={item.key}
                style={{
                  borderWidth: 1,
                  borderColor:
                    showAnswer && checkIfInScoredIds(item.key)
                      ? COLORS.success
                      : showAnswer && !checkIfInScoredIds(item.key)
                      ? COLORS.error
                      : COLORS.primary,

                  height: 40,
                  borderRadius: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 15,
                  marginVertical: 5,
                  opacity:
                    (showAnswer ? 1 : checkIfInBucketA(item.key)) || aDisabled
                      ? 0.5
                      : 1
                }}
              >
                <Text style={{ fontSize: 14, color: "black" }}>
                  {item.word}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <View
          style={{
            width: width / 2 - 20,
            marginHorizontal: 5

            // backgroundColor: "green"
          }}
        >
          {/* <Text>Bucket B</Text> */}
          {props.BucketB &&
            props.BucketB.map(item => (
              <TouchableOpacity
                onPress={() => handleCompletedB(item.key)}
                disabled={checkIfInBucketB(item.key) || bDisabled}
                key={item.key}
                style={{
                  borderWidth: 1,
                  borderColor:
                    showAnswer && checkIfInScoredIds(item.key)
                      ? COLORS.success
                      : showAnswer && !checkIfInScoredIds(item.key)
                      ? COLORS.error
                      : COLORS.primary,

                  height: 40,
                  borderRadius: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 15,
                  marginVertical: 5,
                  opacity: checkIfInBucketB(item.key) || bDisabled ? 0.4 : 1
                }}
              >
                <Text style={{ fontSize: 14, color: "black" }}>
                  {item.word}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      <View
        style={{
          flex: 1
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
        {/* <TouchableOpacity
          onPress={
            showAnswer ? () => handleNextQuiz() : () => handleValidateQuiz()
          }
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
            {showAnswer ? "NEXT" : "CHECK"}
          </Text>
        </TouchableOpacity> */}
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
            mode={showAnswer ? "contained" : "outlined"}
            onPress={
              showAnswer ? () => handleNextQuiz() : () => handleValidateQuiz()
            }
            // disabled={!props.showAnswer}
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            {showAnswer ? "NEXT" : "CHECK"}
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

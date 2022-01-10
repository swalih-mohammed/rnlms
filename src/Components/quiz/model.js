import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Modal, View, TouchableOpacity, Text, Dimensions } from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
import { handleStart } from "../../store/actions/quiz";
import { Button, Title } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import LottieView from "lottie-react-native";
import Loader from "../Utils/Loader";
import AudioPlayerWithoutControl from "../../Helpers/PlayerWithoutControl";

const ScoreModal = props => {
  const { qlength } = props;

  const animation = useRef(null);
  useEffect(() => {
    // animation.current.play(0, 100);
    if (animation.current) {
      animation.current.play(0, 100);
    }
  }, []);

  const restartQuiz = () => {
    props.handleStart();
  };

  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={true}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            width: width * 0.95,
            hight: height * 0.6,
            borderRadius: 20,
            padding: 20,
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {(props.score / qlength) * 100 > 79 ? "Congratulations!" : "Oops!"}
          </Text>
          {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {props.score}
          </Text> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 20
            }}
          >
            {(props.score / qlength) * 100 < 79 ? (
              <>
                <Text
                  style={{
                    fontSize: 30,
                    color: COLORS.error
                  }}
                >
                  {props.score}
                </Text>
                <Text
                  style={{
                    marginLeft: 2,
                    fontSize: 20,
                    color: COLORS.error
                  }}
                >
                  %
                </Text>
              </>
            ) : (
              <Text
                style={{
                  fontSize: 50,
                  color: "#DB9D00"
                }}
              >
                {props.score}
              </Text>
            )}
          </View>
          <View
            style={{
              width: width * 0.6,
              hight: 300,
              // borderRadius: 20,
              padding: 100,
              alignItems: "center"
            }}
          >
            {(props.score / qlength) * 100 > 79 ? (
              <LottieView
                ref={animation}
                source={require("../../../assets/lotties/coin_box.json")}
                autoPlay={true}
                loop={false}
                autoPlay
              />
            ) : (
              <LottieView
                ref={animation}
                source={require("../../../assets/lotties/failure.json")}
                autoPlay={true}
                loop={false}
              />
            )}
          </View>
          <AudioPlayerWithoutControl
            success={(props.score / qlength) * 100 > 79 ? true : false}
            failure={(props.score / qlength) * 100 > 79 ? false : true}
          />

          {/* Retry Quiz button */}

          <TouchableOpacity
            onPress={
              (props.score / qlength) * 100 > 79
                ? () => props.handleSubmitTest()
                : () => restartQuiz()
            }
            style={{
              backgroundColor: COLORS.primary,
              padding: 10,
              width: "95%",
              borderRadius: 10
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: COLORS.white,
                fontSize: 20
              }}
            >
              {(props.score / qlength) * 100 > 79 ? "Next Lesson" : "Try Again"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const mapStateToProps = state => {
  return {
    index: state.quiz.index,
    score: state.quiz.score,
    showScoreModal: state.quiz.showScoreModal
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleNext: data => dispatch(handleNext(data)),
    handleStart: data => dispatch(handleStart(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreModal);

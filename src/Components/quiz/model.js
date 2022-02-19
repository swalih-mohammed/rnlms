import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground
} from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
import { handleStart } from "../../store/actions/quiz";
import { Button, Title, Paragraph } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import LottieView from "lottie-react-native";
import Loader from "../Utils/Loader";
import AudioPlayerWithoutControl from "../../Helpers/PlayerWithoutControl";

const ScoreModal = props => {
  const { qlength } = props;

  const animation = useRef(null);
  useEffect(() => {
    if (animation.current) {
      animation.current.play(0, 100);
    }
  }, []);

  const restartQuiz = () => {
    props.handleStart();
  };

  const icon =
    (props.score / qlength) * 100 > 79
      ? require("../../../assets/goodjob.jpg")
      : require("../../../assets/sad_cat.jpg");

  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={true}
    >
      <View style={{ flex: 1, marginVertical: 5, marginHorizontal: 5 }}>
        <ImageBackground
          source={icon}
          // source={require("../../../assets/goodjob.jpg")}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: "center", opacity: 0.9 }}
        >
          <View
            style={{
              flex: 1.5,
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <Title
              style={{
                color:
                  (props.score / qlength) * 100 > 79 ? COLORS.white : "#001219",
                fontSize: 30,
                fontWeight: "900"
              }}
            >
              {(props.score / qlength) * 100 > 79
                ? "Congratulations!"
                : "Oops!"}

              {/* Lesson Completed! */}
            </Title>
            <Title
              style={{
                color:
                  (props.score / qlength) * 100 > 79
                    ? COLORS.primary
                    : COLORS.error,
                fontSize: 30,
                fontWeight: "900",
                marginTop: 10
              }}
            >
              {(props.score / qlength) * 100 + " %"}
            </Title>
          </View>
          <View
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            {(props.score / qlength) * 100 > 79 ? (
              <LottieView
                // ref={animation}
                source={require("../../../assets/lotties/successGreenRight.json")}
                autoPlay={true}
                loop={false}
                autoPlay
              />
            ) : (
              <LottieView
                // ref={animation}
                source={require("../../../assets/lotties/unapproved-cross.json")}
                autoPlay={true}
                loop={false}
                autoPlay
              />
            )}

            <AudioPlayerWithoutControl
              success={(props.score / qlength) * 100 > 79 ? true : false}
              failure={(props.score / qlength) * 100 > 79 ? false : true}
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <Button
              onPress={() => restartQuiz()}
              style={{
                borderRadius: 8,
                marginBottom: 20,
                borderColor: COLORS.primary,
                paddingVertical: 5
              }}
              mode={
                (props.score / qlength) * 100 < 79 ? "contained" : "outlined"
              }
            >
              {(props.score / qlength) * 100 > 79 ? "Do it agian" : "Try again"}
            </Button>
            {(props.score / qlength) * 100 > 79 && (
              <Button
                onPress={() => props.handleSubmitTest()}
                disabled={(props.score / qlength) * 100 < 79}
                style={{
                  borderRadius: 8,
                  paddingVertical: 5
                }}
                mode="contained"
              >
                continue
              </Button>
            )}
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};
const mapStateToProps = state => {
  return {
    index: state.quiz.index,
    score: state.quiz.score,
    showScoreModal: state.quiz.showScoreModal,
    unit: state.course.unit
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

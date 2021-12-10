import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text
} from "react-native";
const { width, height } = Dimensions.get("window");

import { COLORS, SIZES } from "../../../Helpers/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import console = require("console");

const renderOptions = ({
  Choices,
  validateAnswer,
  isOptionsDisabled,
  showAnswer
}) => {
  //   console.log(showAnswer);
  return (
    <>
      {Choices.map(option => (
        <TouchableOpacity
          onPress={() => validateAnswer(option)}
          disabled={isOptionsDisabled}
          key={option.id}
          style={{
            borderWidth: 3,
            borderColor:
              showAnswer && option.is_correct_choice
                ? COLORS.success
                : showAnswer && !option.is_correct_choice
                ? COLORS.error
                : COLORS.secondary + "40",
            // backgroundColor:
            //   showAnswer && option.is_correct_choice
            //     ? COLORS.success
            //     : showAnswer && !option.is_correct_choice
            //     ? COLORS.error
            //     : COLORS.secondary + "40",
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
    </>
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

export default renderOptions;

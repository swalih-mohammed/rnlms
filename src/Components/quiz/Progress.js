import React, { useState } from "react";
import { View, Animated } from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
// import console = require("console");

export default function ProgressBar({ progressIndex, allQuestionsLength }) {
  // console.log(allQuestionsLength);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progressIndex.interpolate({
    inputRange: [0, allQuestionsLength],
    outputRange: ["0%", "100%"]
  });
  // console.log(progressAnim);
  return (
    <View
      style={{
        width: "100%",
        height: 5,
        borderRadius: 5,
        backgroundColor: "#00000020"
      }}
    >
      <Animated.View
        style={[
          {
            height: 5,
            borderRadius: 5,
            backgroundColor: COLORS.success
          },
          {
            width: progressAnim
          }
        ]}
      ></Animated.View>
    </View>
  );
}

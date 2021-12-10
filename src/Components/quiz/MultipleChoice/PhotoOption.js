import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
const { width, height } = Dimensions.get("window");

import { COLORS, SIZES } from "../../../Helpers/constants";
const renderOptions = ({ Photos, validateAnswer, showAnswer }) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {Photos.map(option => (
        <TouchableOpacity
          key={option.id}
          onPress={() => validateAnswer(option)}
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
          <Image style={styles.option_photo} source={{ uri: option.photo }} />
        </TouchableOpacity>
      ))}
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

export default renderOptions;

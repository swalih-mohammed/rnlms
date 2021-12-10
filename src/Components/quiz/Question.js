import React from "react";
import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
// import console = require("console");

const Question = ({ TitleQuestion, SubTitleQuestion }) => {
  return (
    <View
      style={{
        marginVertical: 40
      }}
    >
      <Text
        style={{
          color: COLORS.black,
          fontSize: 20
        }}
      >
        {TitleQuestion}
      </Text>
    </View>
  );
};

export default Question;

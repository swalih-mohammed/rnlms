import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { WORD_HEIGHT } from "./Layout";
import { DulingoContext } from "./DulingoContext";
import { QuizContext } from "../QuizContext";

const Word = props => {
  const [correctAnswerList] = useContext(DulingoContext);

  // console.log(props.id);
  return (
    <View style={styles.root}>
      <View>
        <View
          style={[
            styles.container,
            {
              borderColor:
                checkIfCorrectPOS(correctAnswerList, props.id) === "InList"
                  ? "green"
                  : checkIfCorrectPOS(correctAnswerList, props.id) ===
                    "OutOfList"
                  ? "red"
                  : "blue"
            }
          ]}
        >
          <Text style={styles.text}>{props.word}</Text>
        </View>
        <View style={styles.shadow} />
      </View>
    </View>
  );
};

const checkIfCorrectPOS = (correctAnswerList, word_id) => {
  // console.log(correctAnswerList);
  if (correctAnswerList?.length > 0) {
    if (correctAnswerList.includes(word_id)) {
      return "InList";
    } else {
      return "OutOfList";
    }
  } else {
    return "NoList";
  }
};

const styles = StyleSheet.create({
  root: {
    padding: 4
  },
  container: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    // borderColor: "#E8E6E8",
    backgroundColor: "white",
    height: WORD_HEIGHT - 8
    // borderColor: checkIfCorrectPOS(text) ? "green" : "red"
  },
  text: {
    // fontFamily: "Nunito-Regular",
    fontSize: 19
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderColor: "#E8E6E8",
    top: 4
  }
});

export default Word;

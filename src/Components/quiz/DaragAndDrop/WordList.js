/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useState, useContext } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { useSharedValue, runOnUI, runOnJS } from "react-native-reanimated";
import SortableWord from "./SortableWord.js";
import Lines from "./Lines";
import { MARGIN_LEFT } from "./Layout";
import { DulingoContext } from "./DulingoContext";
import { createPath } from "react-native-redash";
const containerWidth = Dimensions.get("window").width - MARGIN_LEFT * 2;
const containerHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN_LEFT
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    opacity: 0
  },
  button: {
    backgroundColor: "#59CB01",
    width: "100%",
    height: 45,
    borderRadius: 16,
    justifyContent: "center",
    top: 500
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
  const [correctAnswerWordIdList, setCorrectAnswerWordIdList] = useState([]);
  console.log(props);
  const [correctAnswerList, setCorrectAnswerList] = useContext(DulingoContext);
  const [isUserAnswerCorrect, SetIsUserAnswerCorrect] = useState(false);
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
    // setCorrectAnswerList("1", "2");
    if (offsets) {
      // console.log(offsets);
      const test1 = offsets.filter(o => o.order.value === -1);

      const sentance = offsets.filter(o => o.order.value === -1);
      //find total correct answer in a sentance
      if (sentance.length > 0) {
        // console.log(sentance);
        const correctAnswerIdList = [];
        const question = "Verb";
        for (let i = 0; i < sentance.length; i++) {
          var pos = sentance[i].tags.value;
          if (pos.includes(question)) {
            correctAnswerIdList.push(sentance[i].word_id.value);
          }
        }
        setCorrectAnswerList(correctAnswerIdList);
        // console.log(correctAnswerIdList);
      }

      // const available_mark = sentance.includes(question);
      // console.log(sentance);
      //check how many words have correct POS
      // var total_words = test1.length;
      // var score = 0;
      // if (0 < 1) {
      //   console.log("firing");
      //   for (let i = 0; i < test1.length; i++) {
      //     test1[i].isCorrect.value = true;
      //     setTest(true);
      //     var pos = test1[i].tags.value;
      //     if (pos.includes("Pronoun")) {
      //       score++;
      //     }
      //   }
      // }
      // console.log(offsets);

      // if (test1.length > 0) {
      //   test1.sort(
      //     (a, b) => parseFloat(a.order.value) - parseFloat(b.order.value)
      //   );
      // var userSentance = "";
      // for (let i = 0; i < test1.length; i++) {
      //   userSentance += test1[i].pre_space.value;
      //   userSentance += test1[i].word.value;
      //   userSentance += test1[i].post_space.value;
      // }

      // if (props.correctAnswer === userSentance) {
      //   SetIsUserAnswerCorrect(true);
      // } else {
      //   SetIsUserAnswerCorrect(false);
      // }
      // }
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
    <View style={styles.container}>
      <Lines />
      {props.children.map((child, index) => (
        <SortableWord
          key={index}
          offsets={offsets}
          index={index}
          // containerWidth={containerWidth}
          correctAnswerWordIdList={correctAnswerWordIdList}
        >
          {child}
        </SortableWord>
      ))}
      {/* <Text>{isUserAnswerCorrect ? "Yes" : "No"}</Text> */}
      <RectButton style={styles.button} onPress={checkAnswer}>
        <Text style={styles.label}>CHECK</Text>
      </RectButton>
    </View>
  );
};

export default WordList;

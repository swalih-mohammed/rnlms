import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { DulingoProvider } from "./DulingoContext";
import nlp from "compromise";

import WordList from "./WordList";
import Word from "./Word";
import Header from "./Header";
import Footer from "./Footer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

const Duolingo = ({
  handleNext,
  title,
  qustion,
  answer,
  type,
  validateAnswer,
  numberOfQuestions
}) => {
  // console.log(type);
  return (
    <DulingoProvider>
      {/* <View style={styles.container}> */}
      {/* <StatusBar hidden /> */}
      {/* <Header /> */}
      {qustion ? (
        <WordList
          numberOfQuestions={numberOfQuestions}
          validateAnswer={validateAnswer}
          handleNext={handleNext}
          type={type}
          answer={answer}
          title={title}
        >
          {qustion.map(word => (
            <Word test={123} key={word.id} {...word} />
          ))}
        </WordList>
      ) : null}

      {/* <Footer /> */}
      {/* </View> */}
    </DulingoProvider>
  );
};

export default Duolingo;

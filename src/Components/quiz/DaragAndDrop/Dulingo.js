import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import nlp from "compromise";
import { DulingoProvider } from "./DulingoContext";

import WordList from "./WordList";
import Word from "./Word";
import Header from "./Header";
import Footer from "./Footer";

// const words = [
//   { id: 1, word: "My" },
//   { id: 8, word: "son's" },
//   { id: 2, word: "name" },
//   { id: 7, word: "is" },
//   { id: 6, word: "Amal" },
//   { id: 9, word: "Rayan" }
// ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

const Duolingo = ({ words1, words }) => {
  if (!words1) {
    return null;
  }

  return (
    <DulingoProvider>
      <View style={styles.container}>
        {/* <StatusBar hidden /> */}
        <Header />
        {words1 ? (
          <WordList
            // correctAnswerList={setCorrectAnswerList()}
            correctAnswer={"he will go tomorrow and come next day"}
          >
            {words1.map(word => (
              <Word test={123} key={word.id} {...word} />
            ))}
          </WordList>
        ) : null}

        {/* <Footer /> */}
      </View>
    </DulingoProvider>
  );
};

export default Duolingo;

import React, { useState } from "react";

export const DulingoContext = React.createContext(null);

export const DulingoProvider = props => {
  const [style, setStyle] = useState("light");
  const [wordsInList, setWordsInList] = useState([]);
  const [correctAnswerList, setCorrectAnswerList] = useState([]);

  //   console.log(wordsInList.length);
  function toggleStyle() {
    setStyle(style => (style === "light" ? "dark" : "light"));
  }

  return (
    <DulingoContext.Provider value={[correctAnswerList, setCorrectAnswerList]}>
      {props.children}
    </DulingoContext.Provider>
  );
};

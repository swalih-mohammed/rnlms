import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import { localhost } from "../../Helpers/urls";
import Questions from "./Questions";
import Loader from "../Utils/Loader";
// import { QuizProvider } from "./QuizContext";
import { handleStart } from "../../store/actions/quiz";
// import { handleStart } from "../../store/actions/quiz";
// import Questions from "../../Components/pacticeTest/Qustions";

const QuizList = props => {
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getTest();
  }, []);

  const { lessonId, QuizId, unitId, sectionId } = props.route.params;

  const getTest = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${localhost}/quizzes/${QuizId}`);
      setQuestions(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        // <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
        <Loader />
      ) : (
        <>
          {questions ? (
            // <QuizProvider>
            <Questions
              questions={questions.questions}
              lessonId={lessonId}
              unitId={unitId}
              sectionId={sectionId}
            />
          ) : // </QuizProvider>
          null}
        </>
      )}
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleStart: data => dispatch(handleStart(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(QuizList);

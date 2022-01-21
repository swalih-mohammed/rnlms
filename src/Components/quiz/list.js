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
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getTest();
    // console.log("quiz detail page");
  }, []);

  const { lessonId, QuizId, unitId, sectionId } = props.route.params;

  const getTest = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${localhost}/quizzes/${QuizId}`);
      setQuiz(response.data);
      // console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {quiz ? (
            <Questions
              questions={quiz.questions}
              quiz={quiz.id}
              lesson={quiz.lesson}
              unit={quiz.unit}
              course={quiz.course}
            />
          ) : // <Text>testing</Text>
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

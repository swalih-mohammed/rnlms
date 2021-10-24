import React, { useState, useEffect } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import { localhost } from "../../Helpers/urls";
import Questions from "./Questions";

// import Questions from "../../Components/pacticeTest/Qustions";
const CourseDetail = ({ route }) => {
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getTest();
  }, []);

  const { lessonId, QuizId, unitId } = route.params;

  const getTest = async () => {
    // console.log(123);
    try {
      setLoading(true);
      const response = await axios.get(`${localhost}/quizzes/${QuizId}`);
      // setTest(response.data);
      setQuestions(response.data);
      setLoading(false);
      // console.log(response.data);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
      ) : (
        <>
          {questions ? (
            <Questions
              questions={questions.questions}
              lessonId={lessonId}
              unitId={unitId}
            />
          ) : null}
        </>
      )}
    </>
  );
};
export default CourseDetail;

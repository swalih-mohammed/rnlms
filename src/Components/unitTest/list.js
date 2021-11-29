import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { localhost } from "../../Helpers/urls";
import Questions from "../../Components/unitTest/Questions";
// import { authAxios } from "../../Helpers/authAxios";

const CourseDetail = ({ route }) => {
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getTest();
  }, []);

  const { id } = route.params;

  const getTest = async () => {
    // console.log(test);
    // console.log(localStorage.getItem("user.token"));
    // console.log(user.token);

    try {
      setLoading(true);
      const response = await axios.get(`${localhost}/quizzes/${id}`);
      setTest(response.data[0]);
      setQuestions(response.data[0].questions);
      console.log(response.data);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <>
      <Text>hi</Text>
      {/* {test ? (
        <> */}
      {/* <Card>
            <Card.Title
              title={test.title}
              subtitle={test.subtitle}
              //   left={LeftContent}
            />
          </Card> */}
      {/* {questions ? <Questions questions={questions} testID={test.id} /> : null} */}
      {/* </>
      ) : null} */}
    </>
  );
};
export default CourseDetail;

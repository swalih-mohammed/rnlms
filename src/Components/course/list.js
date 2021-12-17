import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import { MotiView } from "moti";
import { Skeleton } from "@motify/skeleton";

import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text
} from "react-native";
import axios from "axios";
// import { courseListURL } from "../../Helpers/urls";
import { localhost } from "../../Helpers/urls";
import CourseItem from "../../Components/course/item";
import { useNavigation } from "@react-navigation/native";
import GetStarted from "../../Screens/getStarted";
import Loader from "../Utils/Loader";
// import * as Speech from "expo-speech";

const CourseList = props => {
  const navigation = useNavigation();
  const [testData, setTestData] = useState(null);

  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCourses();
    // IdentifyActivityType("Translate below");
    // testApi();
    // SpeakArabic();
  }, []);

  // };
  // SpeakArabic = () => {
  //   console.log("speaking");
  //   // Speech.speak("ا", { language: "ar" });
  // };
  // // const speak = () => {
  // //   const thingToSay = "Apple";
  // //   Speech.speak(thingToSay);
  // // };

  const getCourses = async () => {
    try {
      // console.log("fetching");
      setLoading(true);
      const response = await axios.get(`${localhost}/courses`);
      setCourses(response.data);
      // console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const testApi = async () => {
    // console.log(123);
    const QuizId = 5;
    try {
      setLoading(true);
      const response = await axios.get(`${localhost}/quizzes/${QuizId}`);
      setTest(response.data);
      setTestData(response.data);
      setLoading(false);
      // console.log(response.data);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  if (!courses) {
    return null;
  }

  return (
    <>
      {loading || props.tokenLoading ? (
        // <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
        <Text>Loading...</Text>
      ) : (
        // <Loader />
        <>
          {/* <Skeleton /> */}
          {!props.token ? (
            <GetStarted />
          ) : (
            <FlatList
              data={courses}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                return <CourseItem item={item} />;
              }}
            />

            // <Button onPress={speak}>Test</Button>
          )}
        </>
        // <Text>hi</Text>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenLoading: state.auth.loading
  };
};

export default connect(
  mapStateToProps,
  null
)(CourseList);

// export default CourseList;

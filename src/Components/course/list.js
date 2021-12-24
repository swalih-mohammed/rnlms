import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import { View as MotiView } from "moti";
// import { StatusBar } from "expo-status-bar";
import { Card, Title } from "react-native-paper";
import { COLORS, SIZES } from "../../Helpers/constants";

// import { Skeleton } from "@motify/skeleton";

import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  StatusBar
} from "react-native";
import axios from "axios";
// import { courseListURL } from "../../Helpers/urls";
import { localhost } from "../../Helpers/urls";
import CourseItem from "../../Components/course/item";
import { useNavigation } from "@react-navigation/native";
import GetStarted from "../../Screens/getStarted";
import Loader from "../Utils/Loader";
import LottieView from "lottie-react-native";

import { SafeAreaView } from "react-native-safe-area-context";
// import * as Speech from "expo-speech";

const CourseList = props => {
  const navigation = useNavigation();
  const [testData, setTestData] = useState(null);
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const animation = React.useRef(null);

  useEffect(() => {
    getCourses();
    // animation.current.play(0, 100);

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

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* <LottieView
        ref={animation}
        source={require("../../../assets/lotties/success.json")}
        autoPlay={true}
        loop={true}
      /> */}
      {loading || props.tokenLoading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <>
          {/* <Skeleton /> */}
          {!props.token ? (
            <GetStarted />
          ) : (
            <>
              <View>
                <Card>
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "center",
                      alignSelf: "center"
                    }}
                  >
                    <Title>{"Lakaters"}</Title>
                  </View>
                </Card>
                <FlatList
                  data={courses}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => {
                    return <CourseItem item={item} />;
                  }}
                />
                {/* <Text>hi</Text> */}
              </View>
            </>
          )}
        </>
      )}
    </SafeAreaView>
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

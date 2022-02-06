import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  Text
} from "react-native";
// import { Button } from "react-native-paper";
// import Slider from "@react-native-community/slider";
import Loader from "../Utils/Loader";
import Player from "./SoundPlayer";
const { width, height } = Dimensions.get("window");
import { localhost } from "../../Helpers/urls";
import { useNavigation } from "@react-navigation/native";
import LessonItem from "./lesssonItem2";
import { COLORS, SIZES } from "../../Helpers/constants";
// import Loader from "../Utils/Loader";

function LessonDetail({ route }) {
  // console.log("lesson detail");
  const navigation = useNavigation();

  const [lesson, setLesson] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const getLessonDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${localhost}/lessons/${id}`, {
          cancelToken: source.token
        });
        setLesson(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(error)) {
          console.log("axios cancel error");
        } else {
          console.log("error occured in catch");
          console.log(err);
        }
      }
    };
    getLessonDetail();
    return () => {
      console.log("course detail unmounting");
      source.cancel();
    };
  }, []);
  const { id } = route.params;

  return (
    <>
      {loading ? (
        // <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
        <Loader
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : lesson && lesson.Lesson_items ? (
        <LessonItem
          lessonId={lesson.id}
          unitId={lesson.unit}
          sectionId={lesson.section}
          language={lesson.language1 ? lesson.language1 : lesson.language2}
          hasQuiz={lesson.has_quiz}
          lessonItems={lesson.Lesson_items}
          QuizId={lesson.has_quiz ? lesson.quiz[0].id : 0}
        />
      ) : // <View style={{ justifyContent: "center", alignItems: "center" }}>
      //   <Text>hi</Text>
      // </View>
      null}
    </>
  );
}

export default LessonDetail;

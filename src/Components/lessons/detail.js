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
    getLessonDetail();
    // console.log(lesson.Lesson_items);
  }, []);
  const { id } = route.params;

  const getLessonDetail = async () => {
    // console.log("firing");
    try {
      setLoading(true);
      const response = await axios.get(`${localhost}/lessons/${id}`);
      setLesson(response.data);
      // console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

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

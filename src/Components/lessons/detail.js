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

  if (!lesson) {
    return null;
  }
  return (
    <>
      {loading ? (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
      ) : // <Loader />
      null}
      {lesson.Lesson_items ? (
        <LessonItem
          lessonId={lesson.id}
          unitId={lesson.unit}
          sectionId={lesson.section}
          language={lesson.language1 ? lesson.language1 : lesson.language2}
          // language={lesson.language1}
          hasQuiz={lesson.has_quiz}
          Tracks={lesson.Lesson_items}
          QuizId={lesson.has_quiz ? lesson.quiz[0].id : 0}
        />
      ) : // <Text>testing</Text>
      // <Text>testing</Text>
      null}
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DEE9FD"
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  TopContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  BottomContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  ImgWrapper: {
    width: width * 0.95,
    height: height * 0.7,
    marginTop: 5,
    marginBottom: 25
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },

  text: {
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 12,
    textAlign: "center"
  },
  playButton: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: "#34a8eb",
    borderRadius: 72 / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  track: {
    width: width * 0.8,
    height: 5,
    borderRadius: 1,
    backgroundColor: "#3D425C",
    marginBottom: 30
  }
});
export default LessonDetail;

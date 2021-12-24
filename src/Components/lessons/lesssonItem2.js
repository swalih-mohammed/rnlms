import * as React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import PhotoAndTitle from "./LessonPhoto";
import { connect } from "react-redux";
import { handleStart } from "../../store/actions/quiz";
import Constants from "expo-constants";
import { Button, IconButton, Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import { COLORS, SIZES } from "../../Helpers/constants";
import Animated, { LightSpeedInRight } from "react-native-reanimated";

function AudioPLayer(props) {
  const {
    Tracks,
    lessonId,
    hasQuiz,
    QuizId,
    unitId,
    sectionId,
    language
  } = props;

  const navigation = useNavigation();
  // console.log(Tracks[0]);
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const [CurrentSong, SetCurrentSong] = React.useState(Tracks[0]);
  const [lastSongIndex, setLastSongIndex] = React.useState(0);

  const [isPlaying, SetIsPlaying] = React.useState(false);
  const [didJustFinish, setDidJustFinish] = React.useState(false);

  React.useEffect(() => {
    find_last_track_index();
    // resetQuiz();
    // speakText(language);
  }, [CurrentSong]);

  const speakText = language => {
    if ((language === "Arabic") | (language === "English")) {
      // console.log(language);
      const text = CurrentSong.title;
      Speech.speak(text, { language: language == "Arabic" ? "ar" : "en" });
    } else {
      // console.log(language);
      return;
    }
  };

  const find_last_track_index = () => {
    const track_length = Tracks.length;
    setLastSongIndex(track_length - 1);
  };

  const NextSong = () => {
    const currentSongIndex = Tracks.indexOf(CurrentSong);
    const lastSongIndex = Tracks.indexOf(Tracks[Tracks.length - 1]);
    if (currentSongIndex === lastSongIndex) {
      SetCurrentSong(Tracks[0]);
    } else {
      SetCurrentSong(Tracks[currentSongIndex + 1]);
    }
  };

  const navigateToQuiz = () => {
    navigation.navigate("Lesson Test", {
      QuizId: QuizId,
      lessonId: lessonId,
      unitId: unitId,
      sectionId: sectionId
    });
  };

  const resetQuiz = () => {
    const data = {
      index: 0,
      score: 0,
      showAnswer: false,
      answerList: [],
      showScoreModal: false
    };
    props.handleStart(data);
    navigateToQuiz();
  };

  const handleNext = () => {
    if (Tracks.indexOf(CurrentSong) === lastSongIndex) {
      if (hasQuiz) {
        resetQuiz();
      } else {
        console.log("no quiz");
      }
    } else {
      NextSong();
    }
  };

  const PrevSong = () => {
    const currentSongIndex = Tracks.indexOf(CurrentSong);
    const lastSongIndex = Tracks.indexOf(Tracks[Tracks.length - 1]);
    if (currentSongIndex === 0) {
      SetCurrentSong(Tracks[Tracks.length - 1]);
    } else {
      SetCurrentSong(Tracks[currentSongIndex - 1]);
    }
  };

  const handlePressPrevious = () => {
    if (Tracks.indexOf(CurrentSong) === 0) {
      if (sectionId != null) {
        navigation.navigate("Section Details", {
          id: sectionId
        });
      } else {
        navigation.navigate("Unit Details", { id: unitId });
      }
    } else {
      PrevSong();
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        entering={LightSpeedInRight.duration(1000)}
        style={{ flex: 5, justifyContent: "center" }}
      >
        <PhotoAndTitle
          photo={CurrentSong.photo.photo}
          title={CurrentSong.title}
        />
      </Animated.View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        {/* {Tracks.indexOf(CurrentSong) === 0 ? (
          <View>
            <Button
              mode="contained"
              onPress={
                sectionId != null
                  ? () =>
                      navigation.navigate("Section Details", {
                        id: sectionId
                      })
                  : () => navigation.navigate("Unit Details", { id: unitId })
              }
            >
              Exit
            </Button>
          </View>
        ) : (
          <Button mode="contained" onPress={PrevSong}>
            Exit
          </Button>
        )} */}
        <Button
          mode={Tracks.indexOf(CurrentSong) === 0 ? "contained" : "outlined"}
          onPress={handlePressPrevious}
          style={{ borderWidth: 1, borderColor: COLORS.primary }}
        >
          {Tracks.indexOf(CurrentSong) === 0 ? "EXIT" : "PREV"}
        </Button>

        <MaterialCommunityIcons
          name={!isPlaying || didJustFinish ? "play" : "pause"}
          style={{
            color: COLORS.black,
            fontSize: 30,
            alignSelf: "center",
            // backgroundColor: "gray",
            padding: 10,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: COLORS.primary,
            marginLeft: 20,
            marginRight: 20
          }}
          onPress={speakText}
        />

        <Button
          mode={
            (Tracks.indexOf(CurrentSong) === lastSongIndex) & hasQuiz
              ? "contained"
              : "outlined"
          }
          onPress={handleNext}
          style={{ borderWidth: 1, borderColor: COLORS.primary }}
        >
          {(Tracks.indexOf(CurrentSong) === lastSongIndex) & hasQuiz
            ? "QUIZ"
            : "NEXT"}
        </Button>

        {/* {(Tracks.indexOf(CurrentSong) === lastSongIndex) & hasQuiz ? (
          <View style={{}}>
            <Button mode="contained" onPress={resetQuiz}>
              Quiz
            </Button>
          </View>
        ) : (
          <Button mode="contained" onPress={NextSong}>
            Next
          </Button>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  TopContainer: {
    flex: 5,
    backgroundColor: "black"
  },
  MiddleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "green"
  },
  BottomContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "green"
  },
  ImgWrapper: {
    height: height * 0.9,
    marginTop: 8,
    marginLeft: 5,
    marginRight: 5
  },
  photo: {
    width: "95%",
    height: "85%",
    margin: 5,
    borderRadius: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "700"
  },
  Controls: {
    flexDirection: "row",
    marginTop: 20
  }
});

// export default AudioPLayer;
const mapDispatchToProps = dispatch => {
  return {
    handleStart: data => dispatch(handleStart(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AudioPLayer);

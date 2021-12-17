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

  const PrevSong = () => {
    const currentSongIndex = Tracks.indexOf(CurrentSong);
    const lastSongIndex = Tracks.indexOf(Tracks[Tracks.length - 1]);
    if (currentSongIndex === 0) {
      SetCurrentSong(Tracks[Tracks.length - 1]);
    } else {
      SetCurrentSong(Tracks[currentSongIndex - 1]);
    }
  };

  const resetQuiz = () => {
    const data = {
      index: 0,
      score: 0
    };
    props.handleStart(data);
    // console.log("trigerring");
    navigateToQuiz();
  };

  const navigateToQuiz = () => {
    navigation.navigate("Lesson Test", {
      QuizId: QuizId,
      lessonId: lessonId,
      unitId: unitId,
      sectionId: sectionId
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TopContainer}>
        {/* <View style={styles.ImgWrapper}> */}
        {/* <Card>
            <Card.Cover source={{ uri: CurrentSong.photo }} />
          </Card> */}
        <Image
          style={styles.photo}
          source={{
            uri: CurrentSong.photo.photo
          }}
        />
        {/* </View> */}
      </View>
      <View style={styles.MiddleContainer}>
        <Text style={styles.title}>{CurrentSong.title} </Text>
      </View>
      <View style={styles.BottomContainer}>
        <View style={styles.Controls}>
          {Tracks.indexOf(CurrentSong) === 0 ? (
            <View style={{ marginTop: 20 }}>
              <Button
                mode="Outlined"
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
            <MaterialCommunityIcons
              name="arrow-left"
              style={{
                // color: COLORS.white,
                fontSize: 50,
                alignSelf: "center",
                // backgroundColor: "gray",
                padding: 20
                // borderRadius: 50
                // borderWidth: 1,
                // borderColor: "#34a8eb"
              }}
              onPress={PrevSong}
            />
          )}

          <MaterialCommunityIcons
            name={!isPlaying || didJustFinish ? "play" : "pause"}
            style={{
              // color: COLORS.white,
              fontSize: 50,
              alignSelf: "center",
              // backgroundColor: "gray",
              padding: 20,
              borderRadius: 50
              // borderWidth: 1,
              // borderColor: "#34a8eb"
            }}
            onPress={speakText}
          />

          {(Tracks.indexOf(CurrentSong) === lastSongIndex) & hasQuiz ? (
            <View style={{ marginTop: 20 }}>
              <Button mode="Outlined" onPress={resetQuiz}>
                Take a Quiz
              </Button>
            </View>
          ) : (
            <MaterialCommunityIcons
              name="arrow-right"
              style={{
                // color: COLORS.white,
                fontSize: 50,
                alignSelf: "center",
                // backgroundColor: "gray",
                padding: 20
                // borderRadius: 50
                // borderWidth: 1,
                // borderColor: "#34a8eb"
              }}
              onPress={NextSong}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  TopContainer: {
    flex: 5
  },
  MiddleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  BottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
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

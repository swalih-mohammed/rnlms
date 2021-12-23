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
// import { localhost } from "../../Helpers/urls";
// import { useNavigation } from "@react-navigation/native";
// import LessonItem from "./lesssonItem2";
import { View as MotiView } from "moti";

function LessonDetail({ photo, title }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center"
      }}
      // from={{ opacity: 0, translateX: 500 }}
      // animate={{ opacity: 1, translateX: 0 }}
      // transition={{
      //   type: "spring"
      // }}
    >
      <View>
        <Image
          style={styles.photo}
          source={{
            uri: photo
          }}
        />
      </View>
      <View>
        <Text style={styles.title}>{title} </Text>
      </View>
    </View>
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
    borderRadius: 16
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
  },
  photo: {
    width: "95%",
    height: "85%",
    margin: 5,
    borderRadius: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center"
  }
});
export default LessonDetail;

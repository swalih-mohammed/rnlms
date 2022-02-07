import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import axios from "axios";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text
} from "react-native";
import {
  List,
  Card,
  Avatar,
  Title,
  Paragraph,
  Caption
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SIZES } from "../../Helpers/constants";
// import * as Animatable from "react-native-animatable";
import { setCourseDetails } from "../../store/actions/course";
import { localhost } from "../../Helpers/urls";
import UnitItem from "../unit/item";
import UnitList from "../unit/list";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { handleStart } from "../../store/actions/quiz";
import LottieView from "lottie-react-native";

// import { View as MotiView } from "moti";
import Animated, {
  LightSpeedInRight,
  LightSpeedInLeft
} from "react-native-reanimated";

const ConversationItem = props => {
  const animation = React.useRef(null);
  const { item, is_speaking, is_playing, did_finish } = props;
  // console.log(item);

  // console.log("current item", item.id, is_speaking);

  return (
    <Animated.View
      entering={
        item.speaker === "A"
          ? LightSpeedInLeft.duration(1000)
          : LightSpeedInRight.duration(1000)
      }
    >
      <View
        style={{
          // backgroundColor: "red"
          justifyContent: "flex-start"
          // alignItems: "flex-end"
        }}
      >
        <Card
          style={{
            marginBottom: 10,
            marginRight: item.speaker === "A" ? 120 : 20,
            marginLeft: item.speaker === "B" ? 120 : 20,
            backgroundColor: item.speaker === "A" ? "#aad576" : "#edeec9",
            elevation: 10,
            borderRadius: 16,
            maxWidth: 250,
            minHeight: 100
            //   flexGrow: 0
            //   height: "auto"
          }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            {item.speaker === "A" ? (
              <>
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 5
                  }}
                >
                  <Avatar.Image
                    size={50}
                    source={require("../../../assets/ramu.png")}
                  />
                </View>
                <View style={{ flex: 6 }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                      {is_speaking ? (
                        <LottieView
                          ref={animation}
                          source={require("../../../assets/lotties/audioPlaying.json")}
                          autoPlay={true}
                          loop={true}
                        />
                      ) : null}
                    </View>

                    <View style={{ flex: 3 }}>
                      <Paragraph
                        style={{
                          padding: 10,
                          alignSelf: "flex-start",
                          fontWeight: "700",
                          color: "#001219"
                        }}
                      >
                        {item.content}
                      </Paragraph>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    flex: 6,
                    justifyContent: "center"
                    //   backgroundColor: "red"
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                      {is_speaking && !did_finish ? (
                        <LottieView
                          ref={animation}
                          source={require("../../../assets/lotties/audioPlaying.json")}
                          autoPlay={true}
                          loop={true}
                        />
                      ) : null}
                    </View>
                    <View style={{ flex: 3 }}>
                      <Paragraph
                        style={{
                          padding: 10,
                          alignSelf: "flex-start",
                          fontWeight: "700",
                          color: "#001219"
                        }}
                      >
                        {item.content}
                      </Paragraph>
                      {/* <Text>{is_speaking ? "speaking" : "not speaking"}</Text> */}
                    </View>
                  </View>
                </View>

                <View
                  style={{ flex: 2, justifyContent: "center", marginRight: 5 }}
                >
                  <Avatar.Image
                    size={50}
                    source={require("../../../assets/komu.png")}
                    style={{ alignSelf: "flex-end" }}
                  />
                </View>
              </>
            )}
          </View>
        </Card>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center"
  },

  LeftContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 10
    // backgroundColor: "red"
  },
  MiddleContainer: {
    flex: 6,
    justifyContent: "center",
    marginLeft: 5
  },
  RightContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 10
  },
  photo: {
    width: 180,
    height: 150
  }
});
// export default LessonItem;

const mapDispatchToProps = dispatch => {
  return {
    // setCourseDetails: data => dispatch(setCourseDetails(data)),
    handleStart: data => dispatch(handleStart(data))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(ConversationItem);

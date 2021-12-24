import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import axios from "axios";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { List, Card, Avatar, Title, Paragraph } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SIZES } from "../../Helpers/constants";
import * as Animatable from "react-native-animatable";
import { setCourseDetails } from "../../store/actions/course";
import { localhost } from "../../Helpers/urls";
import UnitItem from "../unit/item";
import UnitList from "../unit/list";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { View as MotiView } from "moti";
import Animated, { LightSpeedInRight } from "react-native-reanimated";

const LessonItem = props => {
  const { LessonItem } = props;
  const { colors } = useTheme();

  // console.log(LessonItem);
  const navigation = useNavigation();
  const [showUnit, setShowUnit] = useState(false);
  //   const handleShowUnits = () => setShowUnit(!showUnit);
  const LeftContent = props => <Avatar.Icon {...props} icon="lead-pencil" />;

  const handlePress = () => {
    const data = {
      lesson: LessonItem.id
    };
    props.setCourseDetails(data);
    navigation.navigate("Lesson Details", { id: LessonItem.id });
  };
  const Completed = props => (
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
      }}
    >
      <MaterialCommunityIcons
        name="check"
        style={{
          color: COLORS.white,
          fontSize: 20
        }}
      />
    </View>
  );

  const NotCompleted = props => (
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: COLORS.enactive,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
      }}
    >
      <MaterialCommunityIcons
        name="check"
        style={{
          color: COLORS.white,
          fontSize: 20
        }}
      />
    </View>
  );

  return (
    <Animated.View
      style={{ margin: 5 }}
      entering={LightSpeedInRight.duration(1000)}
      style={{ margin: 8, backgroundColor: "#8adebb", borderRadius: 15 }}
    >
      <Card>
        <TouchableOpacity
          onPress={
            handlePress
            // console.log("lesson detals")
          }
        >
          <View>
            {LessonItem.lessonCompleted ? (
              <Card.Title
                // title={LessonItem.title}
                title={"Testing"}
                subtitle={"LESSON " + LessonItem.order}
                right={Completed}
                // left={LeftContent}
                left={
                  <Avatar.Image
                    size={24}
                    source={{
                      uri: LessonItem.photo
                    }}
                  />
                }
                titleStyle={{ fontSize: 15 }}
              />
            ) : (
              <Card>
                <TouchableOpacity
                  onPress={
                    () =>
                      navigation.navigate("Lesson Details", {
                        id: LessonItem.id
                      })
                    // console.log("lesson detals")
                  }
                >
                  <View style={styles.container}>
                    <View style={styles.LeftContainer}>
                      <Avatar.Image
                        size={60}
                        source={{
                          uri: LessonItem.photo
                        }}
                      />
                    </View>
                    <View style={styles.MiddleContainer}>
                      {/* <Title>{LessonItem.title} </Title> */}
                      <Title>{"Test"} </Title>
                      <Paragraph>{LessonItem.subtitle}</Paragraph>
                    </View>
                    <View style={styles.RightContainer}>
                      <Completed />
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            )}
          </View>
        </TouchableOpacity>
      </Card>
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
    flex: 2,
    justifyContent: "center"
  },
  MiddleContainer: {
    flex: 6,
    justifyContent: "center",
    marginLeft: 5
  },
  RightContainer: {
    flex: 1,
    justifyContent: "center"
    // marginLeft: 5,
    // marginRight: 5
  },
  photo: {
    width: 180,
    height: 150
  }
});
export default LessonItem;

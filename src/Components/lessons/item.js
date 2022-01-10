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
// import { View as MotiView } from "moti";
import Animated, { LightSpeedInRight } from "react-native-reanimated";

const LessonItem = props => {
  const { LessonItem } = props;
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handlePress = () => {
    const data = {
      lesson: LessonItem.id
    };
    props.setCourseDetails(data);
    navigation.navigate("Lesson Details", { id: LessonItem.id });
  };
  const Completed = () => (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        backgroundColor: LessonItem.lessonCompleted
          ? colors.primary
          : COLORS.enactive,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
      }}
    >
      <MaterialCommunityIcons
        name="check"
        style={{
          color: COLORS.white,
          fontSize: 10
        }}
      />
    </View>
  );

  return (
    <Animated.View
      style={{ margin: 5 }}
      entering={LightSpeedInRight.duration(1000)}
      style={{ margin: 8, borderRadius: 15 }}
    >
      <TouchableOpacity onPress={handlePress}>
        <Card
          mode="outlined"
          style={{
            borderRadius: 15,
            // borderColor: COLORS.primary,
            marginHorizontal: 20
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Lesson Details", {
                id: LessonItem.id
              })
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
                <Title>{LessonItem.title} </Title>
                <Paragraph>{LessonItem.subtitle}</Paragraph>
              </View>
              <View style={styles.RightContainer}>
                <Completed />
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </TouchableOpacity>
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
    justifyContent: "center",
    marginLeft: 10
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
export default LessonItem;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { List, Card, Avatar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SIZES } from "../../Helpers/constants";
import * as Animatable from "react-native-animatable";

import { localhost } from "../../Helpers/urls";
import UnitItem from "../unit/item";
import UnitList from "../unit/list";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

const LessonItem = ({ LessonItem }) => {
  const { colors } = useTheme();

  // console.log(LessonItem);
  const navigation = useNavigation();
  const [showUnit, setShowUnit] = useState(false);
  //   const handleShowUnits = () => setShowUnit(!showUnit);
  const LeftContent = props => <Avatar.Icon {...props} icon="lead-pencil" />;

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
    <Animatable.View animation="flipInX" style={{ margin: 5 }}>
      <Card>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Lesson Details", { id: LessonItem.id })
          }
        >
          {LessonItem.lessonCompleted ? (
            <Card.Title
              title={LessonItem.title}
              subtitle={LessonItem.subtitle}
              right={Completed}
              left={LeftContent}
              titleStyle={{ fontSize: 15 }}
            />
          ) : (
            <Card.Title
              title={LessonItem.title}
              subtitle={LessonItem.subtitle}
              right={NotCompleted}
              left={LeftContent}
              titleStyle={{ fontSize: 15 }}
            />
          )}
        </TouchableOpacity>
      </Card>
    </Animatable.View>
  );
};
export default LessonItem;

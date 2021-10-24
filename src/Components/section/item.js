import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { List, Card, Avatar } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { localhost } from "../../Helpers/urls";
import { useNavigation } from "@react-navigation/native";
import UnitItem from "../unit/item";
import UnitList from "../unit/list";

const SectionItem = ({ sectionItem, has_units }) => {
  // console.log(sectionItem);
  const [showUnit, setShowUnit] = useState(false);
  const navigation = useNavigation();
  const handleShowUnits = () => setShowUnit(!showUnit);
  const goToLessons = id =>
    navigation.navigate("Photo Lesson List", { id: sectionItem.id });

  const LeftContent = props => {
    if (sectionItem.photo) return;
    <Avatar.Icon {...props} icon="view-list" />;
  };

  return (
    <>
      {/* {sectionItem.units ? null : null} */}
      <Animatable.View
        animation="flipInX"
        style={{ margin: 8, backgroundColor: "#8adebb", borderRadius: 15 }}
      >
        <Card>
          <TouchableOpacity onPress={handleShowUnits}>
            {/* <TouchableOpacity
            onPress={
              sectionItem.units
                ? () => goToLessons(sectionItem.id)
                : () => PauseAudio()
            }
          > */}
            {sectionItem.photo ? (
              <Card.Cover source={{ uri: sectionItem.photo }} />
            ) : null}
            <Card.Title
              // title={sectionItem.title}
              title={sectionItem.title}
              subtitle={sectionItem.subtitle}
              left={LeftContent}
              titleStyle={{ fontSize: 18 }}
            />
          </TouchableOpacity>
        </Card>
      </Animatable.View>
      {showUnit ? (
        <>{sectionItem.units ? <UnitList units={sectionItem.units} /> : null}</>
      ) : null}
    </>
  );
};
export default SectionItem;

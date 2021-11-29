import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { List, Card, Avatar, Paragraph, Title } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { localhost } from "../../Helpers/urls";
import { useNavigation } from "@react-navigation/native";
import UnitItem from "../unit/item";
import UnitList from "../unit/list";
import { useTheme } from "react-native-paper";

const SectionItem = ({ sectionItem, has_units }) => {
  const { colors, fonts } = useTheme();

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
          {/* <TouchableOpacity onPress={handleShowUnits}> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Section Details", { id: sectionItem.id })
            }
          >
            {/* {sectionItem.photo ? (
              <Card.Cover source={{ uri: sectionItem.photo }} />
            ) : null}
            <View style={styles.SectionIdContainer}></View>
            <Card.Title
              title={sectionItem.title}
              titleStyle={{ fontSize: 18 }}
              subtitle={"SECTION " + sectionItem.order}
            /> */}
            <View style={styles.container}>
              <View style={styles.LeftContainer}>
                <Image
                  style={styles.photo}
                  source={{
                    uri: sectionItem.photo
                  }}
                />
              </View>
              <View style={styles.RightContainer}>
                <Paragraph>{"SECTION " + sectionItem.order}</Paragraph>
                <Title style={{ fontSize: 18 }}>{sectionItem.title} </Title>
                <Paragraph>{sectionItem.subtitle}</Paragraph>
                {/* <Card.Content> */}
                {/* <Card.Cover source={{ uri: item.photo }} /> */}
                {/* <Card.Title title={item.title} subtitle={item.subtitle} /> */}
                {/* </Card.Content> */}
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </Animatable.View>
      {showUnit ? (
        <>{sectionItem.units ? <UnitList units={sectionItem.units} /> : null}</>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  SectionIdContainer: {
    marginLeft: 20,
    marginTop: 10
  },
  SectionIdText: {
    fontSize: 12,
    fontWeight: "bold"
    // color: colors.gray
    // fontFamily: fonts.android.light
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  RightContainer: {
    flex: 1,
    justifyContent: "center"
    // marginLeft: 15,
    // marginRight: 5
  },
  LeftContainer: {
    flex: 1,
    justifyContent: "center"
  },
  photo: {
    margin: 10,
    borderRadius: 10,
    width: 150,
    height: 100
  }
});
export default SectionItem;

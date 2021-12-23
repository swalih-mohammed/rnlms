import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import axios from "axios";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { List, Card, Avatar, Paragraph, Title } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { setCourseDetails } from "../../store/actions/course";
import Animated, {
  LightSpeedInLeft,
  SlideInLeft
} from "react-native-reanimated";
import { localhost } from "../../Helpers/urls";
import { useNavigation } from "@react-navigation/native";
import UnitItem from "../unit/item";
import UnitList from "../unit/list";
import { useTheme } from "react-native-paper";
import { MotiView } from "moti";

const SectionItem = props => {
  const { colors, fonts } = useTheme();
  const { sectionItem, has_units } = props;
  // console.log(sectionItem);
  const [showUnit, setShowUnit] = useState(false);
  const navigation = useNavigation();
  const handleShowUnits = () => setShowUnit(!showUnit);
  // const goToLessons = id =>
  //   navigation.navigate("Photo Lesson List", { id: sectionItem.id });

  // const LeftContent = props => {
  //   if (sectionItem.photo) return;
  //   <Avatar.Icon {...props} icon="view-list" />;
  // };

  const handlePress = () => {
    const data = {
      section: sectionItem.id
    };
    props.setCourseDetails(data);
    navigation.navigate("Section Details", { id: sectionItem.id });
  };

  return (
    <>
      <Animated.View
        entering={SlideInLeft}
        style={[styles.mainContainer]}
        // style={{ margin: 8, backgroundColor: "#8adebb", borderRadius: 15 }}
        // from={{ opacity: 0, translateX: 500 }}
        // animate={{ opacity: 1, translateX: 0, duration: 1000 }}
        // transition={{
        //   type: "timing"
        // }}
      >
        <Card>
          <TouchableOpacity onPress={handlePress}>
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
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 8,
    backgroundColor: "#8adebb",
    borderRadius: 15
  },
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
// export default SectionItem;

const mapDispatchToProps = dispatch => {
  return {
    setCourseDetails: data => dispatch(setCourseDetails(data))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SectionItem);

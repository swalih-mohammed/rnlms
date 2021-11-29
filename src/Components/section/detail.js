import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  FlatList
} from "react-native";
import { Card, Avatar, Title, Paragraph } from "react-native-paper";
import { localhost } from "../../Helpers/urls";
import SectionList from "../../Components/section/list";
// import UnitList from "../../Components/unit/list";
// import LessonList from "../../Components/lessons/list";
import UnitItem from "../unit/item";
import LessonItem from "../lessons/item";

// const LeftContent = props => <Avatar.Icon {...props} icon="school" />;
const LeftContent = img => (
  <Image
    style={styles.photo}
    source={{
      uri: course ? course.photo : null
    }}
  />
);

const SectionDetail = ({ route }) => {
  //   const [units, setUnits] = useState(null);
  //   const [lessons, setLessons] = useState(null);
  const [section, setSection] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getSectionDetail();
  }, []);

  const { id } = route.params;

  const getSectionDetail = async () => {
    // console.log(123);
    try {
      setLoading(true);
      const response = await axios.get(`${localhost}/courses/sections/${id}`);
      setSection(response.data);
      //   setSections(response.data.sections);
      // console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  if (!section) {
    return null;
  }

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
      ) : (
        <>
          {section ? (
            <Card>
              <View>
                <Card.Title
                  title={section.title}
                  subtitle={section.subtitle}
                  // left={LeftContent}
                />
              </View>
              {/* <View style={styles.container}>
                <View style={styles.LeftContainer}>
                  <Image
                    style={section.photo}
                    source={{
                      uri: section.photo
                    }}
                  />
                </View>
                <View style={styles.RightContainer}>
                  <Title>{section.title} </Title>
                  <Paragraph>{section.subtitle}</Paragraph>
                </View>
              </View> */}
            </Card>
          ) : null}
          {section.has_units ? (
            // <UnitList units={section.units} />
            <FlatList
              data={section.units}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                return <UnitItem unitItem={item} />;
              }}
            />
          ) : (
            <FlatList
              data={section.lessons}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                return <LessonItem LessonItem={item} />;
              }}
            />
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  photo: {
    margin: 10,
    borderRadius: 10,
    width: 150,
    height: 100
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  RightContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5
  },
  LeftContainer: {
    flex: 1,
    justifyContent: "center"
  },
  photo: {
    width: 180,
    height: 150
  }
});
export default SectionDetail;

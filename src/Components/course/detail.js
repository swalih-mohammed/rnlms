import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList
} from "react-native";
import { Card, Avatar, Title, Paragraph } from "react-native-paper";
import { localhost } from "../../Helpers/urls";
import SectionList from "../../Components/section/list";
import SectionItem from "../section/item";
import Loader from "../Utils/Loader";

const LeftContent = props => <Avatar.Icon {...props} icon="school" />;

const CourseDetail = ({ route }) => {
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getCourseDetail();
  }, []);

  const { id } = route.params;

  const getCourseDetail = async () => {
    // console.log(123);
    try {
      setLoading(true);
      const response = await axios.get(`${localhost}/courses/${id}`);
      setCourse(response.data);
      setSections(response.data.sections);
      // console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  if (!course) {
    return null;
  }

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
      ) : (
        // <Loader />
        <>
          <View>
            <Card>
              <View>
                <Card.Title
                  title={course.title}
                  subtitle={course.subtitle}
                  left={LeftContent}
                />
              </View>
            </Card>
          </View>

          {sections ? (
            // <View>
            <FlatList
              data={sections}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                return <SectionItem sectionItem={item} />;
              }}
            />
          ) : // </View>
          null}
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
    justifyContent: "center",
    marginBottom: 10
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
export default CourseDetail;

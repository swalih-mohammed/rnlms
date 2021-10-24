import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, ActivityIndicator } from "react-native";

import { Card, Avatar } from "react-native-paper";
import { localhost } from "../../Helpers/urls";
import SectionList from "../../Components/section/list";

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

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
      ) : (
        <>
          {course ? (
            <Card>
              <View>
                <Card.Title
                  title={course.title}
                  subtitle={course.subtitle}
                  left={LeftContent}
                />
              </View>
            </Card>
          ) : null}
          {sections ? (
            <SectionList sections={sections} hasUnits={course.has_units} />
          ) : null}
        </>
      )}
    </>
  );
};
export default CourseDetail;

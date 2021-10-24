import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text
} from "react-native";
import axios from "axios";
// import { courseListURL } from "../../Helpers/urls";
import { localhost } from "../../Helpers/urls";
import CourseItem from "../../Components/course/item";
import { useNavigation } from "@react-navigation/native";
import GetStarted from "../../Screens/getStarted";

const CourseList = props => {
  const navigation = useNavigation();

  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCourses();
    // console.log(props);
    if (props.token) {
      console.log("no");
      () => navigation.navigate("Getstarted");
    }
  }, []);

  const getCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${localhost}/courses`);
      setCourses(response.data);
      // console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  if (!courses) {
    return null;
  }

  return (
    <>
      {loading || props.tokenLoading ? (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
      ) : (
        <>
          {!props.token ? (
            <GetStarted />
          ) : (
            <FlatList
              data={courses}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                return <CourseItem item={item} />;
              }}
            />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenLoading: state.auth.loading
  };
};

// export default CourseList;
export default connect(
  mapStateToProps,
  null
)(CourseList);

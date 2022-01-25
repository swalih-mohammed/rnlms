import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  View,
  StyleSheet,
  // SafeAreaView,
  StatusBar,
  FlatList,
  Text
} from "react-native";
import {
  Card,
  Avatar,
  ProgressBar,
  Paragraph,
  Title,
  Button
} from "react-native-paper";
import { localhost } from "../../Helpers/urls";
import SectionList from "../../Components/section/list";
import SectionItem from "../section/item";
import UnitItem from "../unit/item";
import Loader from "../Utils/Loader";
import { COLORS, SIZES } from "../../Helpers/constants";

import { SafeAreaView } from "react-native-safe-area-context";

const LeftContent = props => <Avatar.Icon {...props} icon="school" />;

const CourseDetail = props => {
  const [course, setCourse] = useState(null);
  const [units, setUnits] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getCourseDetail();
  }, []);

  const { id } = props.route.params;

  const getCourseDetail = async () => {
    // console.log(123);
    try {
      setLoading(true);
      const username = props.username;
      const response = await axios.get(
        `${localhost}/courses/${id}/${username}`
      );
      setCourse(response.data);
      setUnits(response.data.units);
      // console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handlePressEnroll = () => {
    const data = {
      username: props.username,
      courseId: course.id
    };
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`
    };
    axios.post(`${localhost}/courses/enroll/`, data).then(res => {
      console.log("enrolled in course");
    });
    getCourseDetail().catch(err => {
      setError(err);
    });
  };

  const progress = () => {
    if (course) {
      return course.completed_units + " / " + course.total_units;
    } else {
      return "00/00";
    }
  };

  const progressBar = () => {
    if (course) {
      return course.completed_units / course.total_units;
    } else {
      return 0;
    }
  };

  const CalculateReminingUnits = () => {
    if (course) {
      return course.total_units - course.completed_units + " more units to go";
    } else {
      return "";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {loading ? (
        <Loader />
      ) : (
        // <Text>course detail loading</Text>
        <>
          {course && (
            <>
              <Card>
                <Card.Title
                  title={course.title}
                  subtitle={course.subtitle}
                  left={LeftContent}
                />
                <View
                  style={{
                    marginHorizontal: 25,
                    marginBottom: 20,
                    marginTop: 10
                  }}
                >
                  {course.is_enrolled ? (
                    <>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                          <Paragraph>{CalculateReminingUnits()}</Paragraph>
                        </View>
                        <View style={{ justifyContent: "flex-end" }}>
                          <Paragraph>{progress()}</Paragraph>
                        </View>
                      </View>
                      <View>
                        <ProgressBar
                          progress={progressBar()}
                          color={COLORS.primary}
                        />
                      </View>
                    </>
                  ) : (
                    <Button onPress={handlePressEnroll}>Enroll</Button>
                  )}
                </View>
              </Card>
              {units && (
                <FlatList
                  data={units}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => {
                    return <UnitItem item={item} />;
                  }}
                />
              )}
            </>
          )}
        </>
      )}
    </SafeAreaView>
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

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    token: state.auth.token
  };
};
export default connect(
  mapStateToProps,
  null
)(CourseDetail);

// export default CourseDetail;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Title, List, Button } from "react-native-paper";
import { COLORS, SIZES } from "../../Helpers/constants";

import {
  StyleSheet,
  FlatList,
  // ActivityIndicator,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator

  // SectionList
} from "react-native";
import axios from "axios";
// import { courseListURL } from "../../Helpers/urls";
import { localhost } from "../../Helpers/urls";
import CourseItem from "../../Components/course/item";
import { useNavigation } from "@react-navigation/native";
import GetStarted from "../../Screens/getStarted";
import Loader from "../Utils/Loader";
import LottieView from "lottie-react-native";

import { SafeAreaView } from "react-native-safe-area-context";
// import * as Speech from "expo-speech";

const ITEM_WIDTH = SIZES.width * 0.4;
const ITEM_HEIGHT = ITEM_WIDTH * 2;

const isLoading = loading => {
  if (loading) {
    return <Loader />;
  }
};

const CourseList = props => {
  const navigation = useNavigation();
  const [testData, setTestData] = useState(null);
  const [courses, setCourses] = useState(null);
  const [generalEnglish, setGeneralEnglish] = useState([]);
  const [keralaSchoolEnglihs, setKeralaSchoolEnglihs] = useState([]);
  const [arabiCourses, setArabicCourse] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCourses = async () => {
      try {
        setLoading(true);
        console.log("loading bnf fetch", loading);
        const response = await axios.get(`${localhost}/courses`, {
          cancelToken: source.token
        });
        setLoading(false);
        console.log("loading aftr fetch", loading);

        setCourses(response.data);
        // console.log(response.data);
      } catch (err) {
        if (axios.isCancel(error)) {
          console.log("axios cancel error");
        } else {
          console.log("error occured in catch");
          console.log(err);
        }
      }
    };
    getCourses();
    return () => {
      console.log("course list unmounting");
      source.cancel();
    };
  }, []);

  const FilterArabic = courses => {
    if (courses) {
      const data = courses.filter(course => course.language === "ARABIC");
      return data;
    }
  };

  const FilterEnglish = courses => {
    if (courses) {
      const data = courses.filter(course => course.language === "ENGLISH");
      return data;
    }
  };

  const FilterOther = courses => {
    if (courses) {
      const data = courses.filter(course => course.language !== "ENGLISH");
      // console.log(data.length);
      const data1 = data.filter(course => course.language !== "ARABIC");
      // console.log(data1.length);
      return data1;
    }
  };

  const handlePress = id => {
    if (props.token) {
      const data = {
        course: id
      };
      // props.setCourseDetails(data);
      navigation.navigate("Course Details", { id: id });
    } else {
      // navigation.navigate("Get Started");
    }
  };
  const loadingElement = () => {
    if (loading) {
      return (
        <>
          <Text>Course list loading...</Text>
          {/* <Loader /> */}
        </>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Card>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            justifyContent: "center",
            alignSelf: "center"
          }}
        >
          <Title>{"Lakaters"}</Title>
        </View>
      </Card>
      <>
        {courses ? (
          <ScrollView>
            <View
              style={{
                // flex: 3,
                marginVertical: 10,
                marginHorizontal: 10
                // backgroundColor: "red"
              }}
            >
              <Text
                style={{
                  paddingLeft: 5,
                  paddingVertical: 10,
                  fontSize: 18,
                  fontWeight: "700",
                  opacity: 0.9,
                  color: COLORS.enactive
                }}
              >
                ENGLISH COURSES
              </Text>
              <FlatList
                data={FilterEnglish(courses)}
                keyExtractor={item => item.id.toString()}
                // ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                renderItem={({ item }) => {
                  // return <CourseItem item={item} />;
                  return (
                    <TouchableOpacity
                      onPress={() => handlePress(item.id)}
                      style={{
                        width: 170,
                        height: 275,
                        margin: 8,
                        flex: 1,
                        overflow: "hidden",
                        // backgroundColor: "red",
                        borderRadius: 8
                      }}
                    >
                      <Image
                        style={{
                          flex: 1,
                          resizeMode: "cover"
                        }}
                        source={{
                          uri: item.photo
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View
              style={{
                // flex: 3,
                marginTop: 10,
                marginHorizontal: 10
                // backgroundColor: "red"
              }}
            >
              <Text
                style={{
                  paddingLeft: 5,
                  paddingVertical: 10,
                  fontSize: 18,
                  fontWeight: "700",
                  opacity: 0.9,
                  color: COLORS.enactive
                }}
              >
                ARABIC COURSES
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
                data={FilterArabic(courses)}
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                  // return <CourseItem item={item} />;
                  return (
                    <View
                      style={{
                        width: 170,
                        height: 275,
                        margin: 8,
                        flex: 1,
                        overflow: "hidden",
                        borderRadius: 8
                        // backgroundColor: "red"
                      }}
                    >
                      <Image
                        style={{
                          flex: 1,
                          resizeMode: "cover"
                        }}
                        source={{
                          uri: item.photo
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>
            <View
              style={{
                // flex: 3,
                marginTop: 10,
                marginHorizontal: 10
                // backgroundColor: "red"
              }}
            >
              <Text
                style={{
                  paddingLeft: 5,
                  paddingVertical: 10,
                  fontSize: 18,
                  fontWeight: "700",
                  opacity: 0.9,
                  color: COLORS.enactive
                }}
              >
                OTHER LANGUAGES
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
                data={FilterOther(courses)}
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                  // return <CourseItem item={item} />;
                  return (
                    <View
                      style={{
                        width: 170,
                        height: 275,
                        margin: 8,
                        flex: 1,
                        overflow: "hidden",
                        borderRadius: 8
                      }}
                    >
                      <Image
                        style={{
                          flex: 1,
                          resizeMode: "cover"
                        }}
                        source={{
                          uri: item.photo
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>
        ) : (
          <>
            {/* <Text> courses loading</Text>
            <Loader /> */}
            {/* {isLoading(loading)} */}
            <ActivityIndicator animating={true} color={COLORS.primary} />
          </>
        )}
      </>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
    // tokenLoading: state.auth.loading
  };
};

export default connect(
  mapStateToProps,
  null
)(CourseList);

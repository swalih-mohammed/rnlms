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
  ScrollView
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
        const response = await axios.get(`${localhost}/courses`, {
          cancelToken: source.token
        });
        setLoading(false);
        setCourses(response.data);
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

  // const getCourses = async source => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`${localhost}/courses`, { source });
  //     setLoading(false);
  //     setCourses(response.data);

  //   } catch (err) {
  //     setLoading(false);
  //     setError(err);
  //     console.log("error occured");
  //   }
  // };

  // setLoading(false);
  // setGeneralEnglish(
  //   response.data.filter(course => course.category === "GENERAL_ENGLISH")
  // );
  // setKeralaSchoolEnglihs(
  //   response.data.filter(
  //     course => course.category === "SCHOOL_ENGLISH_KERALA"
  //   )
  // );
  // setArabicCourse(
  //   response.data.filter(course => course.language === "ARABIC")
  // );
  // console.log(response.data);

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
          {/* <Image
                    // style={{ width: "100%", height: "100%" }}
                    source={require("../../../assets/Group 5.png")}
                  /> */}
        </View>
      </Card>
      <>
        {courses ? (
          <FlatList
            // horizontal
            showsHorizontalScrollIndicator={false}
            // ItemSeparatorComponent={() => (
            //   <View style={{ margin: 5 }} />
            // )}
            data={courses}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              return <CourseItem item={item} />;
            }}
          />
        ) : (
          <Text>course list loading...</Text>
        )}
      </>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenLoading: state.auth.loading
  };
};

export default connect(
  mapStateToProps,
  null
)(CourseList);

// export default CourseList;

// <ScrollView>
//   {generalEnglish.length > 0 ? (
//     <List.Section
//       style={{
//         backgroundColor: "#ccd5ae",
//         paddingBottom: 10,
//         paddingHorizontal: 10
//       }}
//     >
//       <List.Subheader>
//         General English Courses
//       </List.Subheader>
//       <FlatList
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         ItemSeparatorComponent={() => (
//           <View style={{ margin: 5 }} />
//         )}
//         data={generalEnglish}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => {
//           return <CourseItem item={item} />;
//         }}
//       />
//     </List.Section>
//   ) : null}
//   {keralaSchoolEnglihs.length > 0 ? (
//     <List.Section
//       style={{
//         backgroundColor: "#d9ed92",
//         paddingBottom: 10,
//         paddingHorizontal: 10
//       }}
//     >
//       <List.Subheader>
//         Kerala School - English
//       </List.Subheader>
//       <FlatList
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         ItemSeparatorComponent={() => (
//           <View style={{ margin: 4 }} />
//         )}
//         data={courses.filter(
//           course =>
//             course.category === "SCHOOL_ENGLISH_KERALA"
//         )}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => {
//           return <CourseItem item={item} />;
//         }}
//       />
//     </List.Section>
//   ) : null}

//   {arabiCourses.length > 0 ? (
//     <List.Section
//       style={{
//         backgroundColor: "#d8e2dc",
//         paddingBottom: 20,
//         paddingHorizontal: 10
//       }}
//     >
//       <List.Subheader>Arabic Courses</List.Subheader>
//       <FlatList
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         ItemSeparatorComponent={() => (
//           <View style={{ margin: 4 }} />
//         )}
//         data={courses.filter(
//           course => course.language === "ARABIC"
//         )}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => {
//           return <CourseItem item={item} />;
//         }}
//       />
//     </List.Section>
//   ) : null}
// </ScrollView>

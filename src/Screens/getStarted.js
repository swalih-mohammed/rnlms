import React from "react";
import { connect } from "react-redux";
import CourseList from "../Components/course/list";
import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions
} from "react-native";
import { Button } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";

const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TopContainer}>
        <View style={styles.ImgWrapper}>
          <Image
            style={styles.photo}
            source={require("../../assets/getStarted4.png")}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>Lakaters</Text>
          <View>
            <Text>A Platform For Lanaguage Learing</Text>
          </View>
        </View>
      </View>
      <View style={styles.BottomContainer}>
        <View style={styles.Buttons}>
          <View>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign up
            </Button>
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  TopContainer: {
    flex: 4
  },
  BottomContainer: {
    flex: 2
  },
  ImgWrapper: {
    width: width * 0.95,
    height: height * 0.5
  },
  photo: {
    width: "100%",
    height: "75%",
    borderRadius: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 30
  },
  Buttons: {
    margin: 20,
    padding: 10,
    justifyContent: "space-around"
  }
});

export default GetStarted;

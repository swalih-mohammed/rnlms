import React from "react";
import {
  SafeAreaView,
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
        <View style={{ alignItems: "center" }}>
          <View style={styles.ImgWrapper}>
            <Image
              style={styles.photo}
              source={require("../../assets/logo.png")}
            />
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
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  TopContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  BottomContainer: {
    flex: 1
  },
  ImgWrapper: {
    width: width * 0.8,
    height: height * 0.4,
    // marginTop: 20
    justifyContent: "center",
    alignItems: "center"
  },
  photo: {
    width: "70%",
    height: "55%",
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

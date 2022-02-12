import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Paragraph } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../Helpers/constants";
import LottieView from "lottie-react-native";

const GetStarted = props => {
  const animation = React.useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (animation.current) {
      animation.current.play(30, 200);
    }
    setTimeout(pushToHome, 2000);
  }, []);

  function pushToHome() {
    if (props.token) {
      navigation.navigate("Courses");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.TopContainer}>
        <Image
          style={styles.photo}
          source={require("../../assets/logo_getting.png")}
        />
      </View>
      <View style={styles.MiddleContainer}>
        <LottieView
          ref={animation}
          source={require("../../assets/lotties/gettingStarted_bookScreenMic.json")}
          autoPlay={true}
          loop={true}
        />
      </View>
      <View style={styles.BottomContainer}>
        {/* <Paragraph style={{ color: COLORS.white, fontWeight: "700" }}>
          SIGN UP
        </Paragraph> */}
        <TouchableOpacity
          style={{
            width: 165,
            height: 40,
            borderRadius: 10,
            backgroundColor: "#212529",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Paragraph style={{ color: COLORS.white, fontWeight: "700" }}>
            SIGN UP
          </Paragraph>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 165,
            height: 40,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Paragraph style={{ color: "black", fontWeight: "700" }}>
            LOGIN
          </Paragraph>
        </TouchableOpacity>
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
    flex: 1.2,
    // paddingTop: 20,
    justifyContent: "flex-end",
    alignItems: "center"
    // backgroundColor: "red"
  },
  MiddleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "red"
  },

  BottomContainer: {
    flex: 0.7,
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  ImgWrapper: {
    width: width * 0.8,
    height: height * 0.4,
    // marginTop: 20
    justifyContent: "center",
    alignItems: "center"
  },
  photo: {
    width: "50%",
    height: "50%",
    resizeMode: "contain"
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

// export default GetStarted;
const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  null
)(GetStarted);

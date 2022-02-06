import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions
} from "react-native";
// import RNHTMLtoPDF from "react-native-html-to-pdf";
import { Button, Paragraph, Card } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../Helpers/constants";

const CertificateScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card
        mode="elevated"
        style={{
          flex: 1,
          //   marginHorizontal: 10,
          //   marginVertical: 10,
          margin: 25,
          //   backgroundColor: "#FFFFFF",
          paddingHorizontal: 20,
          paddingVertical: 20,
          elavation: 20
          //   borderColor: COLORS.primary,
          //   borderWidth: 3,
          //   borderStyle: "dotted"
        }}
      >
        {/* <Card> */}
        <View
          style={{
            flex: 1,
            // backgroundColor: "red",
            justifyContent: "center"
            // marginVertical: "center"
          }}
        >
          <View
            Style={
              {
                //   width: 100,
                //   height: 100
                //   alignItems: "center"
                //   backgroundColor: "red"
              }
            }
          >
            <Image
              style={{ height: 70, width: 100, alignSelf: "center" }}
              source={require("../../assets/logo_certification.png")}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            // backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Paragraph style={{ fontSize: 14 }}>
            This is to certify that
          </Paragraph>
          <Paragraph
            style={{ fontSize: 14, fontWeight: "700", paddingTop: 10 }}
          >
            Femina VP
          </Paragraph>
        </View>
        <View
          style={{
            flex: 1,
            // backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Paragraph
            style={{
              alignContent: "center",
              alignSelf: "center",
              textAlign: "center",
              textAlignVertical: "center",
              fontSize: 12,
              lineHeight: 18
            }}
          >
            has succesfully completed all rquirements of this course, which
            incluses grammar, vocabulary and functional spoken English.
          </Paragraph>
        </View>
        <View
          style={{
            flex: 2.5,
            // backgroundColor: "green",
            justifyContent: "center"
          }}
        >
          <View>
            <Image
              style={{ height: 120, width: "40%", alignSelf: "center" }}
              source={require("../../assets/english_A1_2.png")}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            // backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Paragraph style={{ fontWeight: "700", fontSize: 15 }}>
            A1 - BIGINNER - ENGLISH
          </Paragraph>
        </View>
        <View
          style={{
            flex: 0.8,
            // backgroundColor: "green",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Paragraph style={{ fontSize: 12 }}>
            Completed on 12/03/2021
          </Paragraph>
          <Paragraph style={{ fontSize: 12 }}>Signature</Paragraph>
        </View>
        <View
          style={{
            flex: 1.1,
            // backgroundColor: "#b7b7a4",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: 10
            // flexDirection: "row"
          }}
        >
          <Paragraph
            style={{ fontSize: 10, fontWeight: "700", lineHeight: 15 }}
          >
            Language Skills:
          </Paragraph>
          <Paragraph style={{ fontSize: 10, lineHeight: 15 }}>
            Student can understand and use familiar everyday expressions, can
            introduce him/herself and others, can interact in a simple way
            provided the other person talks slowly and clearly.
          </Paragraph>
        </View>

        <View
          style={{
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center"
            // paddingLeft: 10
          }}
        >
          <Paragraph
            style={{ fontSize: 10, fontWeight: "600", color: COLORS.primary }}
          >
            www.lakaters.com
          </Paragraph>
        </View>

        {/* not part of cert */}
        {/* </Card> */}
      </Card>

      <View
        style={{
          //   flex: 1,
          // backgroundColor: "green",
          justifyContent: "center"
        }}
      >
        <Button
          mode="contained"
          //   onPress={() => navigation.navigate("Login")}
        >
          Download Certificate
        </Button>
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

export default CertificateScreen;

import * as React from "react";
import { View, Dimensions, StyleSheet, Image, Text } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Subheading
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width, height } = Dimensions.get("window");

const CourseIcon = () => {
  <MaterialCommunityIcons
    name="clipboard-list-outline"
    style={{
      fontSize: 30,
      alignSelf: "center",
      padding: 5,
      borderRadius: 50
    }}
  />;
};

const CourseItem = ({ item }) => {
  // console.log(item);
  const navigation = useNavigation();

  const LeftContent = props => {
    if (item.photo) return;
    <Avatar.Icon {...props} icon="school" />;
  };

  return (
    <>
      {item ? (
        <View
          style={{
            margin: 8,
            width: width * 0.95,
            borderRadius: 15,
            paddingTop: 5
          }}
        >
          <Card ViewStyle={{ maring: 20 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Course Details", { id: item.id })
              }
            >
              <View style={styles.container}>
                <View style={styles.LeftContainer}>
                  <Image
                    style={styles.photo}
                    source={{
                      uri: item.photo
                    }}
                  />
                </View>
                <View style={styles.RightContainer}>
                  {/* <Text style={styles.subtitle}>{item.subtitle}</Text>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text> */}
                  <Subheading style={{ fontSize: 14 }}>
                    {item.subtitle}
                  </Subheading>
                  <Title style={{ fontSize: 18 }}>{item.title} </Title>
                  <Paragraph>{item.description}</Paragraph>
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  RightContainer: {
    flex: 1,
    justifyContent: "center"
    // marginLeft: 15,
    // marginRight: 5
  },
  LeftContainer: {
    flex: 1,
    justifyContent: "center"
  },
  photo: {
    margin: 10,
    borderRadius: 10,
    width: 150,
    height: 150
  },
  title: {
    fontSize: 15,
    // fontFamily: "Georgia",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 15
    // fontFamily: "Lucida Console"
  },
  description: {
    fontSize: 15,
    paddingBottom: 2
    // fontFamily: "Arial"
  }
});

export default CourseItem;

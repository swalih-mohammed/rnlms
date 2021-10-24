import * as React from "react";
import { View, Dimensions } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
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
              // onPress={() => console.log(item.photo)}
            >
              <Card.Content>
                <Card.Cover source={{ uri: item.photo }} />
                {/* <Title right={LeftContent}>{item.title}</Title> */}
                <Card.Title
                  title={item.title}
                  subtitle={item.subtitle}
                  // left={LeftContent}
                />
              </Card.Content>
            </TouchableOpacity>
          </Card>
        </View>
      ) : null}
    </>
  );
};

export default CourseItem;

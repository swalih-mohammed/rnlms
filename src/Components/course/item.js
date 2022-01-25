import * as React from "react";
import { connect } from "react-redux";
import { View, Dimensions, StyleSheet, Image } from "react-native";

import {
  Card,
  Title,
  Paragraph,
  Subheading,
  Caption,
  Button
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Animated, { LightSpeedInRight } from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { setCourseDetails } from "../../store/actions/course";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width, height } = Dimensions.get("window");
// import { View as MotiView } from "moti";
import { COLORS } from "../../Helpers/constants";

const CourseItem = props => {
  // const opacityAnim = React.useRef(new Animated.Value(0)).current;
  // const animatedX = React.useRef(new Animated.Value(100)).current;

  const { item } = props;
  const navigation = useNavigation();

  // React.useEffect(() => {
  //   Animated.timing(animatedX, {
  //     toValue: 0,
  //     duration: 2000,
  //     useNativeDriver: false
  //   }).start();
  // }, []);

  const handlePress = () => {
    const data = {
      course: item.id
    };
    props.setCourseDetails(data);
    navigation.navigate("Course Details", { id: item.id });
  };

  return (
    // <Animated.View entering={LightSpeedInRight} style={[styles.mainContainer]}>
    <Card ViewStyle={{ maring: 20 }} mode="contianed" style={{}}>
      {/* <TouchableOpacity onPress={handlePress}> */}
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
          <Caption style={{ fontSize: 14, color: COLORS.grey }}>
            {item.subtitle}
          </Caption>
          <Title style={{ fontSize: 16 }}>{item.title} </Title>
          <Paragraph style={{ flexWrap: "wrap" }}>{item.description}</Paragraph>
        </View>
      </View>
      <Card.Actions
        style={{
          justifyContent: "flex-end",
          marginRight: 10,
          marginBottom: 10
        }}
      >
        <Button
          onPress={handlePress}
          style={{ paddingHorizontal: 20, borderRadius: 20 }}
          mode="contained"
        >
          Explore
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 8,
    // width: width * 0.95,
    borderRadius: 15,
    paddingTop: 5
  },
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  RightContainer: {
    flex: 1,
    justifyContent: "center",
    width: width * 0.6
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
    width: 80,
    height: 120
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

// export default CourseItem;
const mapDispatchToProps = dispatch => {
  return {
    setCourseDetails: data => dispatch(setCourseDetails(data))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(CourseItem);

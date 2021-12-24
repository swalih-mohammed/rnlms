import * as React from "react";
import { connect } from "react-redux";
import { View, Dimensions, StyleSheet, Image } from "react-native";
import { Card, Title, Paragraph, Subheading } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Animated, { LightSpeedInRight } from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { setCourseDetails } from "../../store/actions/course";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width, height } = Dimensions.get("window");
import { View as MotiView } from "moti";

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
    <Animated.View
      entering={LightSpeedInRight.duration(2000)}
      style={[styles.mainContainer]}
      // style={{
      //   margin: 8,
      //   width: width * 0.95,
      //   borderRadius: 15,
      //   paddingTop: 5
      // }}
      // from={{ opacity: 0, translateX: 500 }}
      // animate={{ opacity: 1, translateX: 0, duration: 2000 }}
      // transition={{
      //   type: "timing"
      // }}
    >
      <Card ViewStyle={{ maring: 20 }}>
        <TouchableOpacity onPress={handlePress}>
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
              <Subheading style={{ fontSize: 14 }}>{item.subtitle}</Subheading>
              <Title style={{ fontSize: 18 }}>{item.title} </Title>
              <Paragraph>{item.description}</Paragraph>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 8,
    width: width * 0.95,
    borderRadius: 15,
    paddingTop: 5
  },
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

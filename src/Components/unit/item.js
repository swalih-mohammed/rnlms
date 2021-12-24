import React from "react";
import { connect } from "react-redux";

import { TouchableOpacity, View, Text } from "react-native";
import { List, Card, Avatar } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";
import { setCourseDetails } from "../../store/actions/course";
import { View as MotiView } from "moti";
import { useNavigation } from "@react-navigation/native";
import Animated, { LightSpeedInRight } from "react-native-reanimated";
const LeftContent = props => (
  <Avatar.Icon {...props} icon="format-list-bulleted" />
);
const UnitItem = props => {
  const navigation = useNavigation();
  const { unitItem } = props;

  const handlePress = () => {
    const data = {
      unit: unitItem.id
    };
    props.setCourseDetails(data);
    navigation.navigate("Unit Details", { id: unitItem.id });
  };
  return (
    <Animated.View
      entering={LightSpeedInRight.duration(1000)}
      style={{ margin: 8, backgroundColor: "#8adebb", borderRadius: 15 }}
    >
      <Card>
        {unitItem ? (
          <TouchableOpacity onPress={handlePress}>
            <Card.Title
              subtitle={"UNIT " + unitItem.order}
              title={unitItem.title}
              left={LeftContent}
              titleStyle={{ fontSize: 15 }}
            />
          </TouchableOpacity>
        ) : null}
      </Card>
    </Animated.View>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    setCourseDetails: data => dispatch(setCourseDetails(data))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(UnitItem);

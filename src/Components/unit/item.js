import React from "react";
import { connect } from "react-redux";

import { TouchableOpacity, View, Text } from "react-native";
import { List, Card, Avatar } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";
import { setCourseDetails } from "../../store/actions/course";
import { View as MotiView } from "moti";
import { useNavigation } from "@react-navigation/native";
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
    <MotiView
      style={{ margin: 8, backgroundColor: "#8adebb", borderRadius: 15 }}
      from={{ opacity: 0, translateX: 500 }}
      animate={{ opacity: 1, translateX: 0, duration: 1000 }}
      transition={{
        type: "timing"
      }}
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
    </MotiView>
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

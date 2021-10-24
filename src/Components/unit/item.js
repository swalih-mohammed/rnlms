import React from "react";

import { TouchableOpacity, View } from "react-native";
import { List, Card, Avatar } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";

const LeftContent = props => (
  <Avatar.Icon {...props} icon="format-list-bulleted" />
);

const UnitItem = ({ unitItem }) => {
  const navigation = useNavigation();
  return (
    <Animatable.View
      animation="flipInX"
      style={{ margin: 5, backgroundColor: "#8adebb" }}
    >
      <Card>
        {unitItem ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Unit Details", { id: unitItem.id })
            }
          >
            <Card.Title
              title={unitItem.title}
              subtitle={unitItem.subtitle}
              left={LeftContent}
              titleStyle={{ fontSize: 15 }}
            />
          </TouchableOpacity>
        ) : null}
      </Card>
    </Animatable.View>
  );
};
export default UnitItem;

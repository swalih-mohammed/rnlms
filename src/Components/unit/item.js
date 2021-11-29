import React from "react";

import { TouchableOpacity, View, Text } from "react-native";
import { List, Card, Avatar } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

const LeftContent = props => (
  <Avatar.Icon {...props} icon="format-list-bulleted" />
);

const UnitItem = ({ unitItem }) => {
  const navigation = useNavigation();
  const { colors, fonts } = useTheme();

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
            {/* <Text
              style={{
                fontSize: 10,
                color: colors.gray,
                fontWeight: "bold",
                marginLeft: 75,
                marginTop: 10
              }}
            >
              UNIT {unitItem.id}
            </Text> */}
            <Card.Title
              subtitle={"UNIT " + unitItem.order}
              title={unitItem.title}
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

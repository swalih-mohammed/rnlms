import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { List, Card, Avatar } from "react-native-paper";
import { localhost } from "../../Helpers/urls";
import UnitItem from "./item";

const UnitList = ({ units }) => {
  return (
    <>
      {units ? (
        <FlatList
          data={units}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return <UnitItem unitItem={item} />;
          }}
        />
      ) : null}
    </>
  );
};
export default UnitList;

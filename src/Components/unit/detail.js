import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

// import { View, TouchableOpacity, Text } from "react-native";
import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  StatusBar,
  View,
  Text
} from "react-native";
import { List, Card, Avatar } from "react-native-paper";
import { localhost } from "../../Helpers/urls";
import UnitTestList from "../unitTest/list";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

import LessonItem from "../lessons/item";

const UnitDetail = props => {
  // const { username } = props.username;
  const navigation = useNavigation();

  const [unitTest, setUnitTest] = useState(null);
  const [unit, setUnit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUnitDetail();
    // console.log(id);
  }, []);
  const { id } = props.route.params;

  const getUnitDetail = async () => {
    const unitId = id;
    const username = props.username;
    if (username !== null && unitId !== null) {
      try {
        setLoading(true);
        const response = await axios.get(
          // `${localhost}/courses/units/${unitId}`

          `${localhost}/courses/units/${unitId}/${username}`
        );
        setUnit(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    }
  };

  const LeftContent = props => <Avatar.Icon {...props} icon="school" />;

  if (!unit) {
    return null;
  }
  return (
    <>
      {loading ? (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
      ) : (
        <>
          <Card>
            <TouchableOpacity
            // onPress={() => navigation.navigate("VidoePlayerScreen")}
            >
              <Card.Title
                title={unit.title}
                subtitle={"UNIT " + unit.order}
                left={LeftContent}
                titleStyle={{ fontSize: 18, fontWeight: "bold" }}
              />
            </TouchableOpacity>
          </Card>
          {unit.lessons ? (
            <View style={styles.container}>
              <FlatList
                data={unit.lessons}
                keyExtractor={item => item.id.toString()}
                // renderItem={renderItem}
                renderItem={({ item }) => {
                  return <LessonItem LessonItem={item} unitId={unit.id} />;
                }}
              />
            </View>
          ) : null}
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
    // marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: "#f9c2ff",
    // padding: 20,
    marginVertical: 8
    // marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    // currentAssignment: state.assignments.currentAssignment,
    // loading: state.assignments.loading,
    username: state.auth.username
  };
};

export default connect(
  mapStateToProps,
  null
)(UnitDetail);

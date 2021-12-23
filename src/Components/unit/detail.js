import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

// import { View, TouchableOpacity, Text } from "react-native";
import {
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
import { View as MotiView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../Utils/Loader";
import LessonItem from "../lessons/item";

const LeftContent = props => <Avatar.Icon {...props} icon="school" />;

const UnitDetail = props => {
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

  return (
    <>
      {loading ? (
        // <ActivityIndicator
        //   style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        // />
        <Loader
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="dark" />
          {unit && (
            <Card>
              <TouchableOpacity>
                <Card.Title
                  title={unit.title}
                  subtitle={"UNIT " + unit.order}
                  titleStyle={{ fontSize: 18, fontWeight: "bold" }}
                />
              </TouchableOpacity>
            </Card>
          )}

          {unit && unit.lessons ? (
            <View style={styles.container}>
              <FlatList
                data={unit.lessons}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                  return <LessonItem LessonItem={item} unitId={unit.id} />;
                }}
              />
            </View>
          ) : null}
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#f9c2ff",
    marginVertical: 8
  },
  title: {
    fontSize: 32
  }
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username
  };
};

export default connect(
  mapStateToProps,
  null
)(UnitDetail);

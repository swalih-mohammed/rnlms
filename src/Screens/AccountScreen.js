import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Header from "../Components/Utils/Header";
import Button from "../Components/Utils/Button";
import { useNavigation } from "@react-navigation/native";
import * as actions from "../store/actions/auth";

const Account = props => {
  const navigation = useNavigation();

  //   useEffect(() => {
  //     if (!props.token) {
  //       () => navigation.navigate("Login");
  //     }
  //   }, []);

  return (
    <View style={styles.container}>
      {props.token ? (
        <>
          <Header>My Account</Header>
          <Button mode="contained" onPress={props.logOut}>
            Log out
          </Button>
        </>
      ) : (
        <>
          <Header>You have logged out</Header>
          <Button mode="contained" onPress={() => navigation.navigate("Login")}>
            Login
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
  // label: {
  //   color: colors.secondary
  // },
  // link: {
  //   fontWeight: "bold",
  //   color: colors.primary
  // }
});

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(actions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);

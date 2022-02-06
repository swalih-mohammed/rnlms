import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar
} from "react-native";
import BackGround from "../Components/Utils/BackGround";
import Logo from "../Components/Utils/Logo";
import Header from "../Components/Utils/Header";
// import Button from "../Components/Utils/Button";
import TextInput from "../Components/Utils/TextInput";
import BackButton from "../Components/Utils/BackButton";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../Components/Utils/Loader";
import { COLORS, SIZES } from "../Helpers/constants";
import { Card, Button } from "react-native-paper";

import {
  emailValidator,
  passwordValidator,
  usernameValidator
} from "../Components/Utils/Utilities";

import * as actions from "../store/actions/auth";

const LoginScreen = props => {
  useEffect(() => {
    // console.log(props.token);
    if (props.token) {
      navigation.navigate("Home");
    }
  }, [props.token]);
  // console.log(props.token);
  const navigation = useNavigation();

  const { colors } = useTheme();
  // const [email, setEmail] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const _onLoginPressed = () => {
    // const emailError = emailValidator(email.value);
    const usernameError = usernameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError });
    //   setPassword({ ...password, error: passwordError });
    //   alert("error");
    //   // return;
    // } else {
    //   alert("no error");
    //   props.onAuth(username, password);
    // }

    if (usernameError || passwordError) {
      // if (emailError || passwordError) {
      // setEmail({ ...email, error: emailError });
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      // alert("error");
      // return;
    } else {
      // alert("no error");
      // console.log(username, password);
      setLoading(true);
      console.log(loading);
      // props.onAuth(username.value, password.value);
      login(username.value, password.value);
      setLoading(false);
      console.log(loading);

      // props.onAuth(email.value, password.value);
      // if (props.token) {
      //   console.log("not laoding token exist");
      //   setTimeout(() => {
      //     // console.log('This will run after 1 second!')
      //     navigation.navigate("Home");
      //   }, 1000);
      // }
    }
  };

  const login = async (username, pass) => {
    try {
      // setLoading(true);
      // console.log(loading);
      await props.onAuth(username, pass);
      // setLoading(false);
      if (props.error) {
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {props.loading || loading ? (
        <>
          <Text>Login page is loading...</Text>
          <Loader />
        </>
      ) : (
        <View style={styles.container}>
          <>
            {error && (
              <Card
                style={{
                  width: 300,
                  height: 50
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                  }}
                >
                  <Text style={{ alignSelf: "center", color: COLORS.error }}>
                    An error occured, please retry to login
                  </Text>
                </View>
              </Card>
            )}
            {/* <BackButton goBack={() => navigation.navigate("Home")} /> */}
            {/* <Logo /> */}
            <Header>Welcome back.</Header>
            {/* <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          /> */}
            <TextInput
              label="User Name"
              returnKeyType="next"
              value={username.value}
              onChangeText={text => setUsername({ value: text, error: "" })}
              error={!!username.error}
              errorText={username.error}
              autoCapitalize="none"
              autoCompleteType="username"
              textContentType="username"
              // keyboardType="username"
            />
            <TextInput
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={text => setPassword({ value: text, error: "" })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
            />
            <View style={styles.forgotPassword}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPasswordScreen")}
              >
                <Text style={{ color: colors.primary }}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              disabled={loading}
              mode="contained"
              onPress={_onLoginPressed}
              style={{ width: "100%", marginBottom: 20 }}
            >
              Login
            </Button>
            <Button
              style={{ width: "100%" }}
              disabled={loading}
              mode="outlined"
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign Up
            </Button>
          </>
        </View>
      )}
    </SafeAreaView>
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

// export default memo(LoginScreen);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
    logOut: () => dispatch(actions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

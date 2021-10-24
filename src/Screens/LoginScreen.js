import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import BackGround from "../Components/Utils/BackGround";
import Logo from "../Components/Utils/Logo";
import Header from "../Components/Utils/Header";
import Button from "../Components/Utils/Button";
import TextInput from "../Components/Utils/TextInput";
import BackButton from "../Components/Utils/BackButton";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import {
  emailValidator,
  passwordValidator,
  usernameValidator
} from "../Components/Utils/Utilities";

import * as actions from "../store/actions/auth";

const LoginScreen = props => {
  // console.log(props.token);
  const navigation = useNavigation();

  const { colors } = useTheme();
  // const [email, setEmail] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

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
      props.onAuth(username.value, password.value);
      // props.onAuth(email.value, password.value);

      navigation.navigate("Home");
    }
  };

  return (
    // <BackGround>
    <View style={styles.container}>
      {!props.token ? (
        <>
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
          <Button mode="contained" onPress={_onLoginPressed}>
            Login
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate("SignUp")}>
            Sign Up
          </Button>
          {/* <View style={styles.row}>
            <Text style={{ color: colors.primary }}>
              Don’t have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={{ color: colors.primary }}>Sign up</Text>
            </TouchableOpacity>
          </View> */}
        </>
      ) : (
        // <View style={styles.row}>
        //   <Text style={{ color: colors.primary }}>Don’t have an account? </Text>
        //   <TouchableOpacity
        //     onPress={() => navigation.navigate("RegisterScreen")}
        //   >
        //     <Text style={{ color: colors.primary }}>Log Out</Text>
        //   </TouchableOpacity>
        // </View>
        <Button mode="contained" onPress={props.logOut}>
          Log out
        </Button>
        // <LottieView
        //   source={require("../../assets/lotties/success.json")}
        //   autoPlay
        //   loop
        // />
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

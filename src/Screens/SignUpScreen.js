import React, { memo, useState, useEffect } from "react";
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

  const [username, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password1, setPassword1] = useState({ value: "", error: "" });
  const [password2, setPassword2] = useState({ value: "", error: "" });

  useEffect(() => {
    if (props.token) {
      () => navigation.navigate("Home");
    }
  }, []);

  const _onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const usernameError = usernameValidator(username.value);
    const password1Error = passwordValidator(password1.value);
    const password2Error = passwordValidator(password2.value);

    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError });
    //   setPassword({ ...password, error: passwordError });
    //   alert("error");
    //   // return;
    // } else {
    //   alert("no error");
    //   props.onAuth(username, password);
    // }

    if (usernameError || emailError || password1Error || password2Error) {
      setUsername({ ...username, error: usernameError });
      setEmail({ ...email, error: emailError });
      setPassword1({ ...password1, error: password1Error });
      setPassword2({ ...password2, error: password2Error });
      // alert("error");
      // return;
    } else {
      // alert("no error");
      // console.log();
      // const is_student = false;
      // console.log(password1.value);
      props.authSignup(
        username.value,
        email.value,
        password1.value,
        password2.value
        // is_student
      );

      setTimeout(() => {
        navigation.navigate("Home");
      }, 2000);
    }
  };

  return (
    // <BackGround>
    <View style={styles.container}>
      {/* <BackButton goBack={() => navigation.navigate("Home")} /> */}
      {/* <Logo /> */}
      <Header>Welcome to Lakaters</Header>

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
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        value={password1.value}
        onChangeText={text => setPassword1({ value: text, error: "" })}
        error={!!password1.error}
        errorText={password1.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={password2.value}
        onChangeText={text => setPassword2({ value: text, error: "" })}
        error={!!password2.error}
        errorText={password2.error}
        secureTextEntry
      />
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={{ color: colors.primary }}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
      {/* <View>
        <View>
          <View> */}
      <Button mode="contained" onPress={_onSignUpPressed}>
        Sign up
      </Button>

      <Button mode="outlined" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
      {/* </View>
        </View>
      </View> */}
      {/* <View style={styles.row}>
        <Text style={{ color: colors.primary }}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={{ color: colors.primary }}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
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
    authSignup: (username, password1, password2, is_student) =>
      dispatch(actions.authSignup(username, password1, password2, is_student)),
    logOut: () => dispatch(actions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

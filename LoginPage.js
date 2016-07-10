//JSX style React.Component
import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
  View
} from 'react-native';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    console.log('Login page constructor called');
    this.state = {username: '', password: ''};
  }

  //return view to be rendered
  render() {
    return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={styles.inputType}
        onChangeText={(username) => this.onUsernameChange(username)}
        value={this.state.username}
        />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.inputType}
        onChangeText={(password) => this.onPasswordChange(password)}
        />

      <TouchableNativeFeedback
        style={styles.loginButton}
        onPress={this.onLoginPressed()}>
      <View>
        <Text>Press Me</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
    );
  }

  onUsernameChange(username) {
    //can just write this.setState({username});
    this.setState({username: username});
  }

  onPasswordChange(password) {
    this.setState({password: password});
  }

  onLoginPressed() {

    var username = this.state.username;
    var password = this.state.password;

    if(username.length<5 || password.length < 5) {
      console.log('Incorrect data');
    } else {
      this.loginRequest(username, password);
    }
  }

  loginRequest(username, password) {
    const API_ENPOINT = 'http://192.168.0.145/login';
    fetch(API_ENPOINT, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: {
        username: username,
        password: password
      }
    })
    .then((response) => response.json())
    .then((responseData) => {console.log(JSON.stringify(responseData))})
    .catch((error) => {console.log(error)})
    .done();
  }
}

//define styles to be used by this View
const styles = StyleSheet.create({
  //flex 1 to take up entire height and width
  container: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    justifyContent: 'center',
    margin: 20,
  },

  inputType: {
    marginTop: 20,
  },

  loginButton: {
    alignItems: 'center',
    marginTop: 20,
  }
});

//JSX style function() { return x} changes to () => x
AppRegistry.registerComponent('LoginPage', () => LoginPage);
module.exports = LoginPage;

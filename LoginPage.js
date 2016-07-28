//JSX style React.Component
import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';
import MainPage from './MainPage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginRequest} from './actions/index';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    console.log('Login page constructor called');
    this.state = {username: '', password: '', error: ''};
  }

  //return view to be rendered
  render() {
    var user = 'Some String';
    return (
    <View style={styles.container}>

      <Text style={styles.error}>{this.state.error}</Text>

      <TextInput
        placeholder={user}
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
        onPress={() => this.onLoginPressed()}>
        <View style={styles.loginButton}>
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
      this.setState({error: 'username and password must have atlease 5 characters'});
    } else {
      this.props.loginRequest(username, password);
    }
  }

  handleLoginResponse(responseData) {
    console.log(JSON.stringify(responseData));
    if(responseData.success == false) {
      this.setState({error: 'Please check username and password'});
    } else {
      //store access token
      var accessToken = responseData.access_token;
      AsyncStorage.setItem('accessToken', accessToken).done();
      this.navigate();
    }
  }

  navigate() {
    this.props.navigator.push({
      name: 'MainPage'
    });
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loginRequest: loginRequest}, dispatch);
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
    height: 50,
    backgroundColor: 'skyblue'
  },

  error: {
    color: 'red',
    alignItems: 'center'
  }
});

//JSX style function() { return x} changes to () => x
AppRegistry.registerComponent('LoginPage', () => LoginPage);
export default connect(null, mapDispatchToProps)(LoginPage);

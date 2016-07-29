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
import {fetchLoginResponse} from './actions/index';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    console.log('Login page constructor called');
    this.state = {username: '', password: '', error: ''};
    this.navigate = this.navigate.bind(this);
  }

  //return view to be rendered
  render() {

      if(!this.props.loginResponseData.isFetching && this.props.loginResponseData.isCompleted) {
          //fetch access token
          var accessToken = this.props.loginResponseData.responseData.access_token;
          console.log('access token is ' + accessToken);
          this.saveAccessToken(accessToken);
      }

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

  saveAccessToken(accessToken) {
      AsyncStorage.setItem('access_token', accessToken, ()=> {
          this.navigate();
      });
  }

  onLoginPressed() {

    var username = this.state.username;
    var password = this.state.password;

    if(username.length<5 || password.length < 5) {
      this.setState({error: 'username and password must have atlease 5 characters'});
    } else {
      this.props.fetchLoginResponse(username, password);
    }
  }

  navigate() {
      console.log('inside navigate');
    this.props.navigator.push({
      name: 'MainPage'
    });
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchLoginResponse: fetchLoginResponse}, dispatch);
}

function mapStateToProps(state) {
    return { loginResponseData: state.loginResponseData }
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

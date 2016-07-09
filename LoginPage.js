//JSX style React.Component
import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  TouchableHighlight,
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
        onChangeText={(username) => this.onUsernameChange(username)}
        />
      <TextInput
        placeholder="Password"
        onChangeText={(password) => this.onPasswordChange(password)}
        />

      <TouchableHighlight onPress={this.onLoginPressed.bind(this)}>
      <View>
        <Text>Press Me</Text>
        </View>
      </TouchableHighlight>
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

    console.log('You pressed Login');
  }
}

//define styles to be used by this View
const styles = StyleSheet.create({
  //flex 1 to take up entire height and width
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

//JSX style function() { return x} changes to () => x
AppRegistry.registerComponent('LoginPage', () => LoginPage);
module.exports = LoginPage;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PostData } from '../../services/PostData';
import './Login.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  login() {
    if (this.state.username && this.state.password) {
      PostData('login', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirect: true });
        }
        else {
          alert('login error');
        }
      });
    } else {
      alert('type login and password !!');
    }
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {


    if (this.state.redirect || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'} />)
    }


    return (
      <div className="row" id="Body">
        <div className="medium-5 columns left">
          <h4>Login</h4>
          <label>Username</label>
          <input type="text" name="username" placeholder="username .." onChange={this.onChange} />
          <label>Password</label>
          <input type="password" name="password" placeholder="password .." onChange={this.onChange} />
          <input type="submit" value="Login" onClick={this.login} />
          <span>&nbsp;&nbsp; &nbsp;</span>
          <a href="/signup">Registration</a>
        </div>
      </div>
    );
  }
}
export default Login;
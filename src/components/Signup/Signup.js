import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import { Redirect } from 'react-router-dom';

import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      redirect: false
    }
    this.signup = this.signup.bind(this)
    this.onChange = this.onChange.bind(this);
  }

  signup() {
    if (this.state.username && this.state.password && this.state.email) {
      PostData('signup', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirect: true });
        }
        else {
          alert('registration error');
        }
      });
    } else {
      alert('type informations to signup !!');
    }
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    if (this.state.redirect || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/login'} />)
    }

    return (
      <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="column bodyPart">
          <h2>Login</h2>
          <label>Username</label>
          <input type="text" name="username" placeholder="username .." onChange={this.onChange} />
          <label>Name</label>
          <input type="text" name="name" placeholder="Name .." onChange={this.onChange} />
          <label>Email</label>
          <input type="text" name="email" placeholder="Email .." onChange={this.onChange} />
          <label>Password</label>
          <input type="password" name="password" placeholder="password .." onChange={this.onChange} />
          <input type="submit" value="signup" onClick={this.signup} />
          <span>&nbsp;&nbsp; &nbsp;</span>
          <a href="/login">Login</a>
        </div>
      </div>
    );
  }
}

export default Signup;
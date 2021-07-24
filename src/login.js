import React from "react";
import "./login.css";
import "./App.css";
import backimage from "./Images/image2.jpg";

const url = "http://localhost:3001/users";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
    this.state = { password: "" };
    this.state = { isloginsuccsess: true };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  state = {
    users: [],
  };

  componentDidMount = async () => {
    const usersfrom = await fetch(url);
    let users = await usersfrom.json();
    this.setState({
      users,
    });
  };

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  errorSuccess = (state, props) => {
    this.setState({
      isloginsuccsess: false,
    });
  };

  isLoginSuccessful = (props, state) => {
    const { handleLoginClick } = this.props;
    const { userid } = this.props;
    let succes = false;

    for (let i = 0; i < this.state.users.length; i++) {
      if (
        this.state.username == this.state.users[i].username &&
        this.state.password == this.state.users[i].website
      ) {
        handleLoginClick(true);
        let id = this.state.users[i].id;
        userid(id);
        succes = true;
      }
    }
    if (succes == false) {
      this.errorSuccess();
    }
  };

  render() {
    var sectionStyle = {
      width: "100%",
      height: "1000px",
      backgroundSize: "cover",
      backgroundImage: `url(${backimage})`,
    };
    return (
      <>
        <section style={sectionStyle}>
          <div className="loginform">
            <h1>Login</h1>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChangeUsername}
            ></input>
            <h1>Password</h1>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            ></input>
            <div>
              <button onClick={this.isLoginSuccessful}>Continue</button>
            </div>
            <div
              className={
                this.state.isloginsuccsess ? "successtrue" : "successfalse"
              }
            >
              Неправильный логин или пароль
            </div>
          </div>
        </section>
      </>
    );
  }
}

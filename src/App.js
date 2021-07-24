import "./App.css";
import Login from "./login";
import React from "react";
import Todo from "./todo";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    id: 0,
  };

  handleLoginClick = (param) => {
    this.setState({ isLoggedIn: param });
  };

  userId = (param) => {
    this.setState({ id: param });
  };

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? (
          <Todo
            returnpage={this.handleLoginClick}
            useridin={this.state.id}
            userid={this.userId}
          />
        ) : (
          <Login
            handleLoginClick={this.handleLoginClick}
            userid={this.userId}
          />
        )}
      </div>
    );
  }
}

export default App;

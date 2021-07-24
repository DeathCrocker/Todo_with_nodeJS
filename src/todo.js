import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import backimage from "./Images/image1.jpg";

let todoTasks = [];

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newtodo: "" };
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  state = {
    todosAll: [],
  };

  returnPagefun = () => {
    const { returnpage } = this.props;
    const { userid } = this.props;
    returnpage(false);
    userid(0);
    todoTasks = [];
  };

  handleChangeInput(event) {
    this.setState({ newtodo: event.target.value });
  }

  addNewTodo = async (props) => {
    const { useridin } = this.props;
    if (this.state.newtodo !== "") {
      todoTasks.push({
        text: this.state.newtodo,
        completed: false,
        icon: <DeleteIcon />,
      });

      this.setState({
        todoTasks,
        newtodo: "",
      });

      let todotoJson = {
        title: this.state.newtodo,
        completed: false,
        userId: useridin,
      };
      console.log(todotoJson);
      this.postData("http://localhost:3001/todos", todotoJson);
    }
  };
  postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  deleteData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  componentDidMount = async () => {
    const { useridin } = this.props;

    const url = "http://localhost:3001/todos/" + useridin;
    const todosfrom = await fetch(url);
    let todosAll = await todosfrom.json();

    this.setState({
      todosAll,
    });
    this.buildTodo();
  };

  buildTodo = (state) => {
    for (let i = 0; i < this.state.todosAll.length; i++) {
      todoTasks.push({
        text: this.state.todosAll[i].title,
        completed: this.state.todosAll[i].completed,
        id: this.state.todosAll[i].id,
        icon: <DeleteIcon />,
      });
    }

    this.setState({
      todoTasks,
    });
    console.log(todoTasks);
  };

  clearTodo = (state) => {
    todoTasks = [];
    this.setState({
      todoTasks,
    });
  };

  changeCompleted = (index, state) => {
    todoTasks[index].completed = !todoTasks[index].completed;
    this.setState({
      todoTasks,
    });
  };

  deleteTodo = (index) => {
    let todoDelete = {
      title: todoTasks[index].text,
      completed: todoTasks[index].completed,
    };
    let id = todoTasks[index].id;
    todoTasks.splice(index, 1);
    this.setState({
      todoTasks,
    });
    console.log(id);
    this.deleteData("http://localhost:3001/todos", { id });
    console.log(todoDelete);
  };

  render() {
    const buttonArray = [
      {
        text: "Add",
        icon: "",
        onClick: this.addNewTodo,
      },
      {
        text: "Clear",
        icon: "",
        onClick: this.clearTodo,
      },
      {
        text: "Exit",
        icon: "",
        onClick: this.returnPagefun,
      },
    ];
    var sectionStyle = {
      //width: "100%",
      display: "flex",
      minHeight: "1024px",
      justifyContent: "center",
      backgroundSize: "cover",
      backgroundImage: `url(${backimage})`,
    };

    return (
      <>
        <section style={sectionStyle}>
          <div className="maintodo">
            <div>
              <h1>TODO</h1>
            </div>
            <input
              type="text"
              value={this.state.newtodo}
              onChange={this.handleChangeInput}
              className="input"
            ></input>
            <div>
              {buttonArray.map((button) => (
                <button className="button" onClick={button.onClick}>
                  {button.text}
                </button>
              ))}
            </div>

            <List className="widget">
              {todoTasks.map((todoTasks, index) => (
                <ListItem classname="widget li">
                  <ListItemText onClick={() => this.changeCompleted(index)}>
                    {todoTasks.text}
                  </ListItemText>
                  <ListItemIcon>
                    {this.state.todoTasks[index].completed ? (
                      <CheckIcon />
                    ) : (
                      <CancelIcon />
                    )}
                  </ListItemIcon>
                  <IconButton
                    onClick={() => {
                      this.deleteTodo(index);
                    }}
                  >
                    {todoTasks.icon}
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </div>
        </section>
      </>
    );
  }
}

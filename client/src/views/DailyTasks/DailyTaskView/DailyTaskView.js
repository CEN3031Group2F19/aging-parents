import React from "react";
import DailyTaskItems from "../DailyTaskItems/DailyTaskItems";
import DailyTaskList from "../DailyTaskList/DailyTaskList";
import HeaderPage from "../../../components/Header-Page/HeaderPage";
const axios = require("axios");

class DailyTaskView extends React.Component {
  inputElement = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
        tasks: [],
        currentItem: {
            key: "",
            text: ""
        }
    };

    this.populateTasks();
  }

  // delete task
  deleteItem = async (key) => {
    try {
        const serverUri =
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

        await axios.post(`${serverUri}/DailyTasks/api/Delete`, 
        { key: key });

        this.populateTasks();
      } catch (error) {
          console.log(error);
      }
  };

  handleInput = e => {
    const itemText = e.target.value;
    const currentItem = { text: itemText };
    this.setState({
      currentItem
    });
  };

  //Add task
  addItem = async (e) => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {    
      try {
        const serverUri =
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

        await axios.post(`${serverUri}/DailyTasks/api/Add`, { 
            text: this.state.currentItem.text,
            completed: false,
            userEmail: "test@test.com",
            scheduledTime: new Date(),
        });

        this.setState({currentItem: { text: "", key: "" } } );
        this.populateTasks();
      } catch (error) {
          console.log(error);
      }
    }
  };

  populateTasks = async () => {
    const serverUri =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

    try {
      const response = await axios.get(
        `${serverUri}/DailyTasks/api/Tasks`
      );

      var dbTasks = [];

      response.data.forEach(el => {
        dbTasks.splice(0, 0, {
          key: el.key,
          text: el.text
        });
      });

      this.setState({tasks: [...dbTasks]});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
        [
            <DailyTaskList
              addItem={this.addItem}
              inputElement={this.inputElement}
              handleInput={this.handleInput}
              currentItem={this.state.currentItem}
            />,
            <DailyTaskItems
              entries={this.state.tasks}
              deleteItem={this.deleteItem}
            />
          ]
    );
  }
}
export default DailyTaskView;

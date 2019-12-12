import React, { Component } from "react";
import { Button, Header, Grid } from "semantic-ui-react";
import daily_tasks from "../../../assets/ICONS/ICON_DAILY_TASKS_SUN.png";
import HeaderPage from "../../../components/Header-Page/HeaderPage";
//import bloodPressure from "../../assets/BACKGROUNDS/BG_GREEN_BLOODPRESSURE_IMAGE.png";

class DailyTaskList extends Component {
  componentDidUpdate() {
    this.props.inputElement.current.focus();
  }
  // let dateToFormat = '1976-04-19T12:59-0500';

  render() {
    return (
      <div>
        <HeaderPage icon={daily_tasks} title="Daily Tasks" />
        <Grid container style={{ padding: "3em 0em" }}>
          {/* <Grid.Row>
            <Grid.Column> */}

          {/* <Image
                src={bloodPressure}
                alt="bloodPressure"
                centered
                size="huge"
              /> */}
          {/* </Grid.Column>
          </Grid.Row> */}

          <Grid.Row>
            <Grid.Column>
              <Header as="h1" dividing>
                <form onSubmit={this.props.addItem}>
                  <input
                    placeholder="Type to add a task"
                    ref={this.props.inputElement}
                    value={this.props.currentItem.text}
                    onChange={this.props.handleInput}
                  />
                  <Button floated="right" type="submit">
                    {" "}
                    Add Task{" "}
                  </Button>
                </form>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <Moment></Moment> */}
      </div>
    );
  }
}

export default DailyTaskList;

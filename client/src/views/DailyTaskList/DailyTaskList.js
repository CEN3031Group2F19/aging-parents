import React, { Component } from 'react'
import Moment from 'react-moment';
import { Button, Header, Grid, Image, Modal, Segment } from 'semantic-ui-react'
import bloodPressure from '../../assets/BACKGROUNDS/BG_GREEN_BLOODPRESSURE_IMAGE.png';


class DailyTaskList extends Component {
  componentDidUpdate() {
    this.props.inputElement.current.focus()

  }
  // let dateToFormat = '1976-04-19T12:59-0500';

  render() {
    return (
      <div>

        <Grid container style={{ padding: '3em 0em' }}>

          <Grid.Row>
            <Grid.Column>
              <Segment tertiary>
                <Header as='h1'>
                  Daily Tasks
                  </Header>
              </Segment>
              <img src={bloodPressure} alt="bloodPressure" centered fluid />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as='h1' dividing>
                <form onSubmit={this.props.addItem}>
                  <input
                    placeholder="Type to add a task"
                    ref={this.props.inputElement}
                    value={this.props.currentItem.text}
                    onChange={this.props.handleInput}
                  />
                  <Button type="submit"> Add Task </Button>

                </form>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <Moment></Moment> */}


        {/* <Modal trigger={<Button>Export</Button>}>
        <Modal.Header>Export to File</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>Export functionality...</Header>
            <p>
              TODO: Export tasks as PDF...
            </p>
          </Modal.Description>
        </Modal.Content>
      </Modal> */}
      </div>

    )
  }
}

export default DailyTaskList

import React, { Component } from 'react';
import { Button, Header, Grid, Container, Image, Modal, Segment, Checkbox } from 'semantic-ui-react';

class DailyTaskItems extends Component {
  createTasks = item => {

    return (
      <Grid container style={{ padding: '0em 0em' }}>
        <Grid.Row>
          <p key={item.key} onClick={() => this.props.deleteItem(item.key)}>
            {item.text}
          </p><Checkbox />
          <Container textAlign='right'></Container>
        </Grid.Row>
      </Grid>
    )
  }
  render() {
    const taskEntries = this.props.entries
    const listItems = taskEntries.map(this.createTasks)

    return (
      <div>

        <Container textAlign='center'><strong>Click a task to delete a task; <i> Use the checkbox to indicate a completed task</i></strong></Container>
        <Segment> {listItems} </Segment>

      </div>
    )
  }
}

export default DailyTaskItems
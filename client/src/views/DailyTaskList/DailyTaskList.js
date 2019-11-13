import React, { Component } from 'react'
import Moment from 'react-moment';
import { Button, Header, Image, Modal } from 'semantic-ui-react'


class DailyTaskList extends Component {
  componentDidUpdate() {
    this.props.inputElement.current.focus()
    
  }
 // let dateToFormat = '1976-04-19T12:59-0500';

  render() {
    return (
      <div>
        <Moment></Moment>
        <div>
          <form onSubmit={this.props.addItem}>
            <input
              placeholder="Task"
              ref={this.props.inputElement}
              value={this.props.currentItem.text}
              onChange={this.props.handleInput}
            />           
            <div>
            <Button type="submit"> Add Task </Button>
            </div>
          </form>
        </div>
        
        <Modal trigger={<Button>Export</Button>}>
        <Modal.Header>Export to File</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>Export functionality...</Header>
            <p>
              TODO: Export tasks as PDF...
            </p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      </div>

    )
  }
}

export default DailyTaskList

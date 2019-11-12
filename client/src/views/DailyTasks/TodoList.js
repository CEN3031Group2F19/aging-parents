import React, { Component } from 'react'
import Moment from 'react-moment';


class TodoList extends Component {
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
            <button type="submit"> Add Task </button>
            <button type="submit"> Export </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TodoList

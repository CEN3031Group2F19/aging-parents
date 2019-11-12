import React, { Component } from 'react'

class TodoList extends Component {
  componentDidUpdate() {
    this.props.inputElement.current.focus()
  }
  render() {
    return (
      <div>
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

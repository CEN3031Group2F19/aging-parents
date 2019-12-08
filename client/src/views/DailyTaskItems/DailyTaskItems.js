import React, {
  Component
} from 'react';
import Moment from 'react-moment';

class DailyTaskItems extends Component {
  createTasks(item) {

    return (
      <li key={item.key}
        onClick={() => this.props.deleteItem(item.key)} >
        {item.text}
      </li>
    )
  }
  render() {
    const taskEntries = this.props.entries
    const listItems = taskEntries.map(this.createTasks)

    return <ul > {listItems} </ul>
  }
}

export default DailyTaskItems
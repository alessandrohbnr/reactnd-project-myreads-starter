import React from 'react'
import { SHELF_TYPES } from "../BookShelf/dictionary";

class BookMenu extends React.Component {
  render() {
    const {
      onSelectOption,
      selected
    } = this.props

    return (
      <div className="book-shelf-changer">
        <select 
          value={selected}
          onChange={(event) => onSelectOption(event.target.value)}>
          <option disabled>Move to...</option>
          <option value={SHELF_TYPES.CURRENTLY_READING}>Currently Reading</option>
          <option value={SHELF_TYPES.WANT_TO_READ}>Want to Read</option>
          <option value={SHELF_TYPES.READ}>Read</option>
          <option value={SHELF_TYPES.NONE}>None</option>
        </select>
      </div>
    )
  }
}

export default BookMenu

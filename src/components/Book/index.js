import React from 'react'
import BookMenu from '../BookMenu'
import PropTypes from 'prop-types'
import { SHELF_TYPES } from '../BookShelf/dictionary'

class Book extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    imageLinks: PropTypes.object,
    authors: PropTypes.array,
    shelf: PropTypes.string
  }

  onChangeShelf = (newShelf) => {
    const {
      id,
      onChangeShelf
    } = this.props

    onChangeShelf({id}, newShelf)
  }

  render() {
    const {
      title,
      imageLinks = {},
      authors,
      shelf = SHELF_TYPES.NONE
    } = this.props

    let authorsFormated  = authors ? authors.join(', ') : ''

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
          <BookMenu 
            selected={shelf}
            onSelectOption={this.onChangeShelf} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authorsFormated}</div>
      </div>
    )
  }
}

export default Book

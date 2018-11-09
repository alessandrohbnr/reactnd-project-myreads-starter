import React from 'react'
import PropTypes from 'prop-types'
import Book from '../Book'

class BookShelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  renderBooks() {
    const {onChange} = this.props

    return (
      <ol className="books-grid">
      {this.props.books.map((book) => (
        <li key={book.id}>
          <Book 
            {...book}
            onChangeShelf={onChange} />
        </li>
      ))}
      </ol>
    )
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          {this.renderBooks()}
        </div>
      </div>
    )
  }
}

export default BookShelf

import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import BookShelf from '../../components/BookShelf'
import { SHELF_TYPES } from '../../components/BookShelf/dictionary'
import { Alert } from 'react-bootstrap'

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  renderLoading() {
    return (
      <Alert bsStyle="info">Loading Books...</Alert>
    )
  }

  render() {
    const {
      books,
      onChangeBookShelf
    } = this.props
    const booksReading = []
    const booksWantRead = []
    const booksRead = []
    const hasBooks = !!books.length

    for (const book of books) {
      if (book.shelf === SHELF_TYPES.CURRENTLY_READING) {
        booksReading.push(book)
      } else if (book.shelf === SHELF_TYPES.WANT_TO_READ) {
        booksWantRead.push(book)
      } else {
        booksRead.push(book)
      }
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {!hasBooks && this.renderLoading()}
          <div>
            <BookShelf 
              books={booksReading}
              title="Currently Reading"
              onChange={onChangeBookShelf} />
            <BookShelf 
              books={booksWantRead} 
              title="Want to Read"
              onChange={onChangeBookShelf} />
            <BookShelf 
              books={booksRead} 
              title="Read"
              onChange={onChangeBookShelf} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks

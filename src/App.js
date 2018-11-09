import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './containers/SearchBooks'
import ListBooks from './containers/ListBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onChangeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((resp) => {
      this.getAllBooks()
    })
  }

  onSearch = (query) => {
    return BooksAPI.search(query).then((books) => {
      return books.map((result) => {
        for (const book of this.state.books) {
          if (book.id === result.id) {
            return Object.assign({}, result, book)
          }
        }
        return result
      })
    })
  }

  onBack = () => {
    history.push('/')
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks 
            books={this.state.books} 
            onChangeBookShelf={this.onChangeBookShelf}
            onGoToSearch={this.getAllBooks} />
        )}/>
        <Route exact path="/search" render={({history}) => (
          <SearchBooks 
            onSearch={this.onSearch}
            onBack={this.onBack}
            onChangeBookShelf={this.onChangeBookShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp

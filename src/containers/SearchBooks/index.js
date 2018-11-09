import React from 'react'
import {Link} from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import Book from '../../components/Book'

const MIN_QUERY_CHARS = 2

class SearchBooks extends React.Component {
  constructor(props) {
    super(props)
    this.queryInput = null

    this.focusTextInput = () => {
      if (this.queryInput) this.queryInput.focus();
    };
  }

  state = {
    query: '',
    results: []
  }

  componentDidMount() {
    this.focusTextInput()
  }

  updateQuery = (query) => {
    if (query.length >= MIN_QUERY_CHARS) {
      this.props.onSearch(query).then((books) => {
        let results = []

        if (!!!books.error) {
          results = books.map((book) => ({
            ...book,
            onChangeShelf: this.props.onChangeBookShelf
          }))
        }

        this.setState({ results })
      })
    } else {
      this.setState({ results: [] })
    }

    this.setState({ query })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  renderNoResultsMsg() {
    return (
      <Alert bsStyle="warning">No results found! Please try again</Alert>
    )
  }

  haveNoResults() {
    return !!((this.queryInput && this.queryInput.value.length > MIN_QUERY_CHARS) && this.state.results.length === 0)
  }

  render() {
    const {
      query,
      results
    } = this.state
    console.log(`RENDER onSearch`, results);
    return (
      <div className="search-books">
        <div className="search-books-bar">
            <Link to="/" onClick={this.clearQuery} className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                ref={(el) => this.queryInput = el}
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
        </div>
        <div className="search-books-results">
          {this.haveNoResults() && this.renderNoResultsMsg()}
          <ol className="books-grid">
            {results.map((book) => (
              <li key={book.id}>
                <Book {...book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks

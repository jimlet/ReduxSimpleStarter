import React, { Component } from 'react';
// Sugar above - import react, and pull off its Component property as a separate var.
// We need this import event thought we don't reference it in code
// because Babel turns JSX in React.createComponent.
// Without it, it will blow up at runtime.

// This is a functional component, but we need a class component
// because it needs to be able to keep state and inspect itself.
// We refactor below.
// const SearchBar = () => {
//   return <input />;
// };

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };

    // We have to do this bind() here because since onInputChange is called
    // as a callback, this will be undefined.
    // The alternative is to make the signature this: onInputChange(term)
    // and then use an inline anonymous arrow function in onChange:
    // onChange={(event) => this.onInputChange(event.target.value)}.
    // That will work because of lexical this in arrow functions -
    // this will be persisted from its context.
    // But note that if we use this syntax:
    // onChange={function(event) { this.onInputChange(event.target.value) }}
    // this will be undefined again and we'll need the bind() call.
    // *** I think the arrow function is a nicer way because bind() is a difficult to
    // follow change to how the code works. But leaving it this way becasue
    // the React docs for form elements actually show the bind() way.
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const term = event.target.value;
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={this.onInputChange}
        />
      </div>
    );
  }
}

export default SearchBar;

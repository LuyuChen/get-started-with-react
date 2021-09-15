import React from 'react';

class SearchBar extends React.Component {
  //  constructor(props) {
  //    super(props);

  //    this.onFormSubmit = this.onFormSubmit.bind(this);
  //  }

  state = {term: ''};

  onFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div className='ui segment'> 
        <form onSubmit={this.onFormSubmit} className='ui form'>
          <div className='field'>
            <label>Image Search</label>
            <input type='text' value={this.state.term} onChange={(e) => this.setState({term: e.target.value})}/>
          </div>
        </form>
      </div>
    )

    // we don't want add () to this.onInputChange because we don't want the function get called everytime
    // the component renders, we want to the function to be called inside the input component waiting
    // for user's action in the future, we only want to pass a callback to event handler

    // dont add parenthesis to event handler in JSX
  }
}

export default SearchBar;
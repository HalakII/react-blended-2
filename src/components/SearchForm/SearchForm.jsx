import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  handleSubmitForm = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  onChange = evt => {
    this.setState({
      query: evt.target.value,
    });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmitForm}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          value={this.state.query}
          required
          autoFocus
          onChange={this.onChange}
        />
      </SearchFormStyled>
    );
  }
}

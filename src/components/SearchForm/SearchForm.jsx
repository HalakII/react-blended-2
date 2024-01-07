import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

import React from 'react';

export const SearchForm = ({ onSubmit, onChange }) => {
  const [query, setQuery] = useState('');

  const handleSubmitForm = evt => {
    evt.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  const handleInputChange = evt => {
    setQuery(evt.target.value);
    if (onChange) {
      onChange(evt);
    }
  };

  return (
    <SearchFormStyled onSubmit={handleSubmitForm}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        placeholder="What do you want to write?"
        name="search"
        value={query}
        required
        autoFocus
        onChange={handleInputChange}
      />
    </SearchFormStyled>
  );
};

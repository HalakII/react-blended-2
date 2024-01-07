import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';

import React from 'react';

export const EditForm = ({ currentTodo, onUpdate, onChange, onCancel }) => {
  const handleEditFormUpdate = e => {
    e.preventDefault();
    const { id, text } = currentTodo;
    onUpdate(id, { text });
  };
  return (
    <SearchFormStyled onSubmit={handleEditFormUpdate}>
      <BtnEdit type="button" onClick={onCancel}>
        <MdOutlineCancel size="16px" color="red" />
      </BtnEdit>
      <FormBtn type="submit">
        <RiSaveLine size="16px" color="green" />
      </FormBtn>
      <InputSearch
        placeholder="EDIT TODO"
        name="edit"
        required
        defaultValue={currentTodo.text}
        autoFocus
        onChange={onChange}
      />
    </SearchFormStyled>
  );
};

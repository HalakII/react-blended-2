import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';
import { Component } from 'react';

export class EditForm extends Component {
  handleEditFormUpdate = e => {
    e.preventDefault();
    const { id, text } = this.props.currentTodo;
    this.props.onUpdate(id, { text });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.handleEditFormUpdate}>
        <BtnEdit type="button" onClick={this.props.onCancel}>
          <MdOutlineCancel size="16px" color="red" />
        </BtnEdit>

        <FormBtn type="submit">
          <RiSaveLine size="16px" color="green" />
        </FormBtn>

        <InputSearch
          placeholder="EDIT TODO"
          name="edit"
          required
          defaultValue={this.props.currentTodo.text}
          autoFocus
          onChange={this.props.onChange}
        />
      </SearchFormStyled>
    );
  }
}

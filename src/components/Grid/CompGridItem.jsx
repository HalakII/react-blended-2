import React from 'react';
import { Todo } from 'components';
import { GridItem } from './Grid.styled';

export const CompGridItem = ({ id, text, counter, onDeleteTodo, onEdit }) => {
  console.log(onDeleteTodo);
  return (
    <GridItem>
      <Todo
        text={text}
        counter={counter}
        id={id}
        onDeleteTodo={onDeleteTodo}
        onEdit={onEdit}
      />
    </GridItem>
  );
};

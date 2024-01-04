import React from 'react';
import { CompGridItem } from 'components';
import { Grid } from './Grid.styled';

export const CompGrid = ({ todos, onDeleteTodo, onEdit }) => {
  return (
    <Grid>
      {todos.map(({ text, id }, index) => (
        <CompGridItem
          key={id}
          text={text}
          counter={index + 1}
          id={id}
          onDeleteTodo={onDeleteTodo}
          onEdit={onEdit}
        />
      ))}
    </Grid>
  );
};

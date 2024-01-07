import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { CompGrid, SearchForm, Text, EditForm } from 'components';

import React from 'react';

export const Todos = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('todos')) ?? []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState({ id: null, text: '' });
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = text => {
    const todo = { text, id: nanoid() };
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const handleDeleteTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = id => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setIsEditing(true);
    setEditingTodo({ id, text: todoToEdit.text });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingTodo({ id: null, text: '' });
  };

  const handleInputEditChange = event => {
    setEditingTodo(prevEditingTodo => ({
      ...prevEditingTodo,
      text: event.target.value,
    }));
  };

  const handleInputUpdatedTodos = (id, updatedTodo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: updatedTodo.text } : todo
    );
    setIsEditing(false);
    setEditingTodo({ id: null, text: '' });
    setTodos(updatedTodos);
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          onUpdate={handleInputUpdatedTodos}
          onCancel={handleCancel}
          onChange={handleInputEditChange}
          currentTodo={editingTodo}
        />
      ) : (
        <SearchForm onSubmit={handleSubmit} />
      )}

      {todos.length === 0 && (
        <Text textAlign="center">There are no any todos</Text>
      )}
      <CompGrid
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onEdit={handleEdit}
      />
    </>
  );
};

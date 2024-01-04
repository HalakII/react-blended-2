import { Component } from 'react';
import { nanoid } from 'nanoid';

import { CompGrid, SearchForm, Text, EditForm } from 'components';

const TODOS_KEY = 'todos';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    editingTodo: {},
  };

  componentDidMount = () => {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    if (todos) {
      this.setState({ todos });
    }
  };

  componentDidUpdate = (_, prevState) => {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    }
  };

  handleSubmit = text => {
    const todo = { text, id: nanoid() };
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  handleDeleteTodo = id => {
    console.log(id);
    const { todos } = this.state;
    const newTodos = todos.filter(todo => todo.id !== id);
    this.setState({ todos: newTodos });
  };

  handleEdit = id => {
    const { todos } = this.state;
    const todoToEdit = todos.find(todo => todo.id === id);
    this.setState({
      isEditing: true,
      editingTodo: { id, text: todoToEdit.text },
    });
  };

  handleCancel = () => {
    this.setState({
      isEditing: false,
      editingTodo: {},
    });
  };

  handleInputEditChange = event => {
    this.setState(prevState => ({
      editingTodo: {
        ...prevState.editingTodo,
        text: event.target.value,
      },
    }));
  };

  handleInputUpdatedTodos = (id, updatedTodo) => {
    const { todos } = this.state;
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: updatedTodo.text } : todo
    );

    this.setState({
      todos: updatedTodos,
      isEditing: false,
      editingTodo: {},
    });
  };

  render() {
    const { todos, editingTodo, isEditing } = this.state;
    return (
      <>
        {isEditing ? (
          <EditForm
            onUpdate={this.handleInputUpdatedTodos}
            onCancel={this.handleCancel}
            onChange={this.handleInputEditChange}
            currentTodo={editingTodo}
          />
        ) : (
          <SearchForm onSubmit={this.handleSubmit} />
        )}

        {todos.length === 0 && (
          <Text textAlign="center">There are no any todos</Text>
        )}
        <CompGrid
          todos={todos}
          onDeleteTodo={this.handleDeleteTodo}
          onEdit={this.handleEdit}
        />
      </>
    );
  }
}

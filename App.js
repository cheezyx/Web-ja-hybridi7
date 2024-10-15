import { StatusBar } from 'expo-status-bar';
import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const initialState = {
 todos: [
    { id: 1, text: 'Add todo by writing and saving' },
    { id: 2, text: 'Remove todo by tapping it' },
  ],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload }],
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  const handleRemoveTodo = id => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add new..."
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <TouchableOpacity style={styles.Button} onPress={handleAddTodo}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <FlatList
        data={state.todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
            <Text style={styles.todoItem}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  Button: {
    backgroundColor: '#ff69b4',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  todoItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
});

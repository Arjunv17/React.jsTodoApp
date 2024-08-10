import React, { useState } from 'react';
import style from './home.module.css';

const TodoApp = () => {
  let getData = localStorage.getItem('todolist');
  const [todos, setTodos] = useState(getData ? JSON.parse(getData) :[]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  const addTodo = () => {
    if (input.trim()) {
      let updateTodo = [...todos, input];
      localStorage.setItem('todolist',JSON.stringify(updateTodo))
      setTodos(updateTodo);
      setInput('');
    }
  }

  const startEditTodo = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setInput(todos[index])
  }

  const saveEditTodo = () => {
    if (input.trim() && editIndex !== null) {
      let updateTodo = todos.map((todo, i)=>(
        i === editIndex ? input : todo
      ))
      localStorage.setItem('todolist',JSON.stringify(updateTodo))
      setTodos(updateTodo);
      setIsEditing(false);
      setEditIndex(null)
      setInput('')
    }
  }

  const deleteTodo = (index)=>{
    if (index !== null) {
        let delTodo = todos.filter((_, i)=> i !== index)
        localStorage.setItem('todolist',JSON.stringify(delTodo))
        setTodos(delTodo);
    }
  }

  

  return (
    <div className={style.container}>
      <div className={style.todoApp}>
        <h1 className={style.heading}>Todo App</h1>
        <div className={style.todoInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            className={style.input}
          />
          {
            isEditing ? <button onClick={saveEditTodo} className={style.addButton}>Save</button> :
              <button onClick={addTodo} className={style.addButton}>Add</button>
          }


        </div>
        <table className={style.todoTable}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index} className={style.todoItem}>
                <td>{todo}</td>
                <td>
                  <button onClick={()=>startEditTodo(index)} className={style.editButton}>Edit</button>
                  <button onClick={()=>deleteTodo(index)} className={style.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoApp;

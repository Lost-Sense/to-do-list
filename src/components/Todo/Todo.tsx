import { Input } from 'antd';
import s from './Todo.module.css';
import { TypeTodo } from './Todo.type';
import { useState } from 'react';
import { IList } from '../List/List.type';
import { nanoid } from 'nanoid';

export function Todo({ setValueTask }: TypeTodo) {
  const { Search } = Input;
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      setValueTask((prevTasks: IList[]) => {
        const updatedTasks = [
          ...prevTasks,
          {
            title: inputValue,
            id: nanoid(4),
            completed: false,
            isEditing: false,
          },
        ];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      setInputValue('');
    }
  };

  return (
    <>
      <Search
        name="addTask"
        className={s.input}
        onSearch={addTask}
        maxLength={100}
        enterButton="Add"
        placeholder="Enter your task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></Search>
    </>
  );
}

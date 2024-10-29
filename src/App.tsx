import { useState } from 'react';
import s from './App.module.css';
import { Todo } from './components/Todo/Todo';
import { List } from './components/List/List';
import { IList } from './components/List/List.type';

function App() {
  const [valueTask, setValueTask] = useState<IList[]>([]);

  return (
    <>
      <h1 className={s.main_title}>
        {valueTask.length === 1 || valueTask.length === 0
          ? `YOU HAVE ${valueTask.length} TASK`
          : `YOU HAVE  ${valueTask.length} TASKS`}
      </h1>
      <Todo setValueTask={setValueTask}></Todo>
      <List valueTask={valueTask} setValueTask={setValueTask}></List>
    </>
  );
}

export default App;


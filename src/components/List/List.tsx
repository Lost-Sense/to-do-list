import { TypeList } from './List.type';
import s from './List.module.css';
import { useEffect, useState } from 'react';

export function List({ valueTask, setValueTask }: TypeList) {
  const [newTitle, setNewTitle] = useState<{ [key: string]: string }>({});
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setValueTask(JSON.parse(savedTasks));
    }
  }, [setValueTask]);

  const removeTask = (id: string) => {
    const updatedTasks = valueTask.filter((task) => task.id !== id);
    setValueTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const startEditing = (task: { id: string; title: string }) => {
    setNewTitle((prev) => ({ ...prev, [task.id]: task.title }));
    const updatedTasks = valueTask.map((t) =>
      t.id === task.id ? { ...t, isEditing: true, completed: false } : t
    );
    setValueTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const saveEdit = (id: string) => {
    const title = newTitle[id];
    if (!title.trim()) return;
    const updatedTasks = valueTask.map((task) =>
      task.id === id ? { ...task, title: title, isEditing: false } : task
    );
    setValueTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTitle((prev) => ({ ...prev, [id]: '' }));
  };

  const cancelEdit = (task: { id: string; title: string }) => {
    const updatedTasks = valueTask.map((t) =>
      t.id === task.id ? { ...t, isEditing: false } : t
    );
    setValueTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = valueTask.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setValueTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleChangeTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setNewTitle((prev) => ({ ...prev, [id]: event.target.value }));
  };

  const filteredTasks = valueTask.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'active') {
      return !task.completed;
    }
    return true;
  });

  return (
    <>
      <div className={s.show_buttons}>
        <button className={s.button_show} onClick={() => setFilter('all')}>
          Show All Tasks
        </button>
        <button className={s.button_show} onClick={() => setFilter('active')}>
          Show Active Tasks
        </button>
        <button
          className={s.button_show}
          onClick={() => setFilter('completed')}
        >
          Show completed Tasks
        </button>
      </div>
      <ul className={s.ul}>
        {filteredTasks.map((task) => (
          <li
            className={`${s.li} ${task.completed ? s.completed : ''}`}
            key={task.id}
          >
            {!task.isEditing && (
              <input
                name={task.id}
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
            )}
            {task.isEditing ? (
              <div className={s.editing}>
                <input
                  name={task.id}
                  className={s.editing_input}
                  type="text"
                  maxLength={100}
                  defaultValue={task.title}
                  onChange={(e) => handleChangeTitle(e, task.id)}
                />
                <div className={s.group_buttons}>
                  <button
                    className={s.button_save}
                    onClick={() => saveEdit(task.id)}
                  >
                    SAVE
                  </button>
                  <button
                    className={s.button_cancel}
                    onClick={() => cancelEdit(task)}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`${s.task} ${
                  task.completed ? s.completed_task : ''
                }`}
              >
                {task.title}
              </div>
            )}
            {!task.isEditing && (
              <div className={s.group_buttons}>
                <button
                  className={s.button_edit}
                  onClick={() => startEditing(task)}
                >
                  EDIT
                </button>
                <button
                  className={s.button_del}
                  onClick={() => removeTask(task.id)}
                >
                  DEL
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

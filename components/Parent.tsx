import * as React from 'react';
import { useState, ChangeEvent, useRef } from 'react';
import '../style.css';
import { Itask } from '../interface';
import ToDoItem from './toDoItem';

export default function Parent() {
  /* let [task, setTask] = useState<string>('');
   let [deadline, setdeadline] = useState<number>(0);*/
  //
  let [todolist, setToDoList] = useState<Itask[]>([]);

  const Identity = useRef(null);

  const displaydate = new Date();

  const task = useRef<HTMLInputElement>(null);
  const deadline = useRef<HTMLInputElement>(null);

  //for check value

  const checkid = useRef(null);

  // handler to set data
  // const handledatadisplay = (event: ChangeEvent<HTMLInputElement>): void => {
  //   if (event.target.name === 'task') setTask(event.target.value);
  //   else setdeadline(Number(event.target.value));
  // };
  //--------------------***--------------

  const handledatadisplay = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'task') {
      task.current.value = event.target.value;
    } else deadline.current.value = event.target.value;
  };

  //handler to push data
  const handledatapush = () => {
    const genID = Date.now();

    if (task.current.value == '' || deadline.current.value == '0') {
      alert('please fill all the fields');
    } else {
      if (Identity.current) {
        const newarr = todolist.map((item) => {
          if (item.ID === Identity.current) {
            item.taskname = task.current.value;

            item.daystocomplete = deadline.current.value;
          }
          return item;
        });

        setToDoList(newarr);
      } else {
        const newtask = {
          taskname: task.current.value,
          daystocomplete: deadline.current.value,
          ID: genID,
          isComplete: false,
        };
        setToDoList([...todolist, newtask]);

        console.log(todolist);
      }
      task.current.value = '';
      deadline.current.value = '0';
      Identity.current = null;
    }
  };

  // handler to delete data
  const handledelete = (tasknametodelete: number): void => {
    {
      console.log('this is delete func');
    }
    setToDoList(
      todolist.filter((task) => {
        return task.ID !== tasknametodelete;
      })
    );
  };

  // handle edit data
  const handleEdit = (taskidtoedit: number): void => {
    Identity.current = taskidtoedit;
    todolist.map((clickedForEdit) => {
      if (Identity.current === clickedForEdit.ID) {
        task.current.value = clickedForEdit.taskname;
        deadline.current.value = clickedForEdit.daystocomplete;
      }
      // else {
      //   [...todolist];
      // }
    });
  };

  //handle checkbox toggle
  const handleCheckbox = (taskIdcheck: number, checkboxval: boolean): void => {
    checkid.current = taskIdcheck;

    const newarr = todolist.map((item) => {
      if (item.ID === checkid.current) {
        item.isComplete = checkboxval;
      }
      return item;
    });
    setToDoList(newarr);
  };
  //
  console.log('task.current: ', task.current);

  return (
    <div>
      <div className="navbar">
        <h1> TO-DO LIST APP</h1>
        <h3>Date:{displaydate.toLocaleDateString()}</h3>
      </div>
      <div className="inputarea">
        <label>SET GOAL:</label>
        <input
          type="text"
          name="task"
          defaultValue=""
          placeholder="input task...."
          onChange={handledatadisplay}
          ref={task}
        />

        <label> BALL-PARK YOUR GOAL:</label>
        <input
          type="number"
          defaultValue={0}
          name="deadline"
          placeholder="deadline in days"
          onChange={handledatadisplay}
          ref={deadline}
        />

        <button onClick={handledatapush} id="button">
          {' '}
          {Identity.current ? 'save task' : 'add the task'}
        </button>
      </div>

      <div className="outputarea">
        <table id="task " cellPadding="20" cellSpacing="20">
          <thead id="tablehead">
            <tr>
              <th>task</th>
              <th>days to complete</th>
              <th>edit or delete</th>
            </tr>
          </thead>
          <tbody id="todo">
            {todolist.map((task: Itask, id) => {
              return (
                <ToDoItem
                  task={task}
                  key={id}
                  tasktodelete={handledelete}
                  tasktoedit={handleEdit}
                  handleCheck={handleCheckbox}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

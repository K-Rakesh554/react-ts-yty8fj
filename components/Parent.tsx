import * as React from 'react';
import { useState, ChangeEvent, useRef, useCallback } from 'react';
import '../style.css';
import { Itask } from '../interface';
import ToDoItem from './toDoItem';
import Navbar from './navbar';

export default function Parent() {
  let [todolist, setToDoList] = useState<Itask[]>([]);

  const Identity = useRef(null);

  // task and deadline
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

  // here event that is occuring is of type htmlInputelement which converts inputdata into
  //its respective types as event is of type generic event
  // hence the variable to which u assign should also be of type generic event

  const handledatadisplay = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.name === 'task') {
        task.current.value = event.target.value;
      } else deadline.current.value = event.target.value;
    },
    []
  );

  //handler to push data
  const handledatapush = useCallback(() => {
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
      document.getElementById('button').innerText = 'add-task';
    }
  }, [todolist, task.current, deadline.current]);

  // handler to delete data
  const handledelete = useCallback(
    (tasknametodelete: number): void => {
      if (Identity.current == null)
        setToDoList(
          todolist.filter((task) => {
            return task.ID !== tasknametodelete;
          })
        );
    },
    [todolist]
  );

  // handle edit data
  const handleEdit = useCallback(
    (taskidtoedit: number): void => {
      Identity.current = taskidtoedit;

      document.getElementById('button').innerText = 'save-task';

      console.log(Identity.current);
      todolist.map((clickedForEdit) => {
        if (Identity.current === clickedForEdit.ID) {
          task.current.value = clickedForEdit.taskname;
          deadline.current.value = clickedForEdit.daystocomplete;
        }
      });
    },
    [Identity.current, task.current, todolist, deadline.current]
  );

  //handle checkbox toggle
  const handleCheckbox = useCallback(
    (taskIdcheck: number, checkboxval: boolean): void => {
      if (Identity.current === null) {
        checkid.current = taskIdcheck;
        const newarr = todolist.map((item) => {
          if (item.ID === checkid.current) {
            item.isComplete = checkboxval;
          }
          return item;
        });
        setToDoList(newarr);
      }
    },
    [todolist, checkid.current]
  );

  return (
    <div>
      <Navbar />
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
          add-task
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

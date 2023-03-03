import React, { ChangeEvent, Fragment, useRef } from 'react';
import { Itask } from '../interface';
import './style2.css';

interface Props {
  task: Itask;
  tasktodelete(taskID: number): void;
  tasktoedit(taskID: number): void;
  handleCheck(taskID: number, checked: boolean): void;
}

function ToDoItem({ task, tasktodelete, tasktoedit, handleCheck }: Props) {
  const buttonedit = (): void => {
    tasktoedit(task.ID);
  };

  const buttondelete = (): void => {
    tasktodelete(task.ID);
  };

  const checkbutton = (e: ChangeEvent<HTMLInputElement>): void => {
    handleCheck(task.ID, e.target.checked);
  };
  return (
    <tr>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={checkbutton}
          />
          {task.isComplete ? (
            <label className="form-check-label-true">{task.taskname}</label>
          ) : (
            <label>{task.taskname}</label>
          )}
        </div>
      </td>

      {task.isComplete ? (
        <Fragment>
          <td className="form-check-label-true">
            {' '}
            days left: {task.daystocomplete}{' '}
          </td>
        </Fragment>
      ) : (
        <Fragment>
          <td>days left: {task.daystocomplete} </td>
        </Fragment>
      )}
      {task.isComplete ? (
        <td>
          {' '}
          <button onClick={buttonedit} disabled>
            edit task{' '}
          </button>
          <button onClick={buttondelete}>delete task</button>
        </td>
      ) : (
        <td>
          {' '}
          <button onClick={buttonedit}>edit task </button>
          <button onClick={buttondelete}>delete task</button>{' '}
        </td>
      )}
    </tr>
  );
}
export default React.memo(ToDoItem);

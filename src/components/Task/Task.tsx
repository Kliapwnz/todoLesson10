import React, {ChangeEvent, memo} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist/Todolist";


type TaskPropsType = {
   task:TaskType
   todolistId:string
   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
   changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
   removeTask: (taskId: string, todolistId: string) => void

}
export const Task = memo(({task, changeTaskTitle,changeTaskStatus, removeTask, todolistId}:TaskPropsType) => {
   const onClickHandler = () => removeTask(task.id, todolistId)
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      changeTaskStatus(task.id, newIsDoneValue, todolistId);
   }
   const onTitleChangeHandler = (newValue: string) => {
      changeTaskTitle(task.id, newValue, todolistId);
   }
   return (
      <div>
         <div className={task.isDone ? "is-done" : ""}>
         <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
         />

         <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
         <IconButton onClick={onClickHandler}>
            <Delete/>
         </IconButton>
      </div>
      </div>
   );
});


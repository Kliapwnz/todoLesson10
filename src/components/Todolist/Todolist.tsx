import React, {memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from '../../App';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Button, ButtonProps} from "@mui/material";
import {Task} from "../Task/Task";


export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   id: string
   title: string
   tasks: Array<TaskType>
   removeTask: (taskId: string, todolistId: string) => void
   changeFilter: (value: FilterValuesType, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
   removeTodolist: (id: string) => void
   changeTodolistTitle: (id: string, newTitle: string) => void
   filter: FilterValuesType
   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
   const addTask = useCallback((title: string) => {
      props.addTask(title, props.id);
   }, [props.addTask, props.id])

   const removeTodolist = () => {
      props.removeTodolist(props.id);
   }
   const changeTodolistTitle = useCallback((title: string) => {
      props.changeTodolistTitle(props.id, title);
   }, [props.changeTaskTitle, props.title])

   const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
   const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
   const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
   let tasks = props.tasks;
   tasks = useMemo(() => {
      if (props.filter === "active") {
         tasks = tasks.filter(t => !t.isDone);
      }
      if (props.filter === "completed") {
         tasks = tasks.filter(t => t.isDone);
      }
      return tasks
   },[props.tasks])



   return <div>
      <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
         <IconButton onClick={removeTodolist}>
            <Delete/>
         </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <div>
         {
            tasks.map(t => {

               return <Task task={t}
                            key={t.id}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            todolistId={props.id}/>
            })
         }
      </div>
      <div>
         <KliButton variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
                    title={"All"}
         />
         <KliButton variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}
                    title={"Active"}
         />
         <KliButton variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
                    title={"Completed"}
         />
      </div>
   </div>
})

type KliButtonPropsType = {} & ButtonProps

const KliButton = ({variant, onClick, color, title, ...rest}: KliButtonPropsType) => {
   return <Button variant={variant}
                  onClick={onClick}
                  color={color}
                  {...rest}>{title}
   </Button>
}



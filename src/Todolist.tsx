import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: TodolistPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }

    const addTask = () => {
        {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPress}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(task => {
                    const onRemoveHandler = () => {
                        props.removeTask(task.id)
                    }
                    return <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>;
}

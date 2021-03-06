import React, {ChangeEvent, useState} from "react";import {TextField} from "@material-ui/core";type EditableSpanPropsType = {   title: string   onChange: (newValue: string) => void}export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {   const [editMode, setEditMode] = useState(false)   const [title, setTitle] = useState('')   const onEditMode = () => {      setEditMode(true)      setTitle(props.title)   }   const offEditMode = () => {      setEditMode(false)      props.onChange(title);   }   const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)   return (      editMode         ? <TextField value={title}                  onChange={onChangeTitle}                  onBlur={offEditMode}                  autoFocus/>         : <span onDoubleClick={onEditMode}>{props.title}</span>   )}
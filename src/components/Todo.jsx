import React, { useEffect, useRef, useState } from 'react'

import todo_icon from "../assets/todo_icon.png"
import TodoItems from './TodoItems'

const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

    const add = ()=>{
        const inputText = inputRef.current.value.trim();

        if(inputText === ""){
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,

        }

        setTodoList((prev)=> [...prev, newTodo] );
        inputRef.current.value = "";
    }

    const deleteTodo = (id)=>{
        setTodoList((prvTodos)=>{
           return prvTodos.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id)=>{
        setTodoList((prevTodo)=>{
            return prevTodo.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList))        
    }, [todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        
    {/*------- Title -------*/}

    <div className='flex items-center mt-7 gap-2'>
        <img src={todo_icon} alt="" className='w-8'/>
        <h1 className='text-3xl font-semibold'>TO-DO LIST</h1>
    </div>

    {/*------- Input-box -------*/}

    <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" name="" id="" placeholder='Add your task' />
        <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
    </div>

    {/*------- Todo-list -------*/}

    <div>

    {todoList.map((item, idx)=>{
        return <TodoItems key={idx} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
    })}
    </div>



    </div>
  )
}

export default Todo
import React, { useState } from 'react';


const TodoList = () => {
    const [todo, setTodo] = useState([])
    // list of todos that will display ^
    const [newTodo, setNewTodo] = useState("")


// this is what the form will follow on submission.. 
    const handleSubmit = (e) => {

// prevents refresh
        e.preventDefault();

// prevents empty todos
        if (newTodo.length == 0){
            return;
        }

// todo items start incomplete(false) and string comes from newTodo
        const todoItem = {
            text: newTodo,
            complete: false
        }

        // all todos in list and new todo item added
        setTodo([...todo, todoItem]);
        setNewTodo("");
        // ^ when the new todo item is added, on change the input will be blank
    }


// delete function filters out deleted todos by index
    const handleDelete = (delIdx) => {
        const filterTodo = todo.filter((todo, i) => {
            return i !== delIdx;
            // only if the index doesnt match the index of the deleted todo
        });
        setTodo(filterTodo)
    }


// checkbox function - index must match
    const handleCheckbox = (idx) => {
        const updateTodo = todo.map((todo, i) => {
            if (idx === i){
                todo.complete = !todo.complete
            }
            return todo;
        })
        setTodo(updateTodo)
    }


    return (
        <div>
{/* the form calls handleSubmit */}
            <form onSubmit={handleSubmit}>
{/* when changed, calls setNewTodo */}
                <input type="text" onChange={(e)=>setNewTodo(e.target.value)} value={newTodo}/>
                <button className='add'>Add</button>

            </form>

            {todo.map((todo, i) => {
                return(
                    <div className='list' key={i}>
{/* keeping track of index so i don't change everything */}

{/* checkbox in front, calls handleCheckbox only if changed */}
                        <input type="checkbox" className='checkbox' onChange={(e)=> handleCheckbox(i)} checked={todo.complete} />

{/* is the todo complete ? if true line-through : if false none */}
                        <span style={{textDecoration: todo.complete ? 'line-through' : 'none'}}>{todo.text}</span>

{/* delete button after the todo, calls handleDelete */}
                        <button className='button' onClick={(e)=>{ handleDelete(i);}}>
                            Delete
                        </button>

                    </div>
                )
            })}
        </div>
    )
}

export default TodoList
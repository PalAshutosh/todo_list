import  {useState} from 'react'

import "./Todo.css";
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { getLocalStorageTodoData, setLocalStorageTodoData } from './TodoLocalStorage';

const Todo = () => {
const [task, setTask] = useState(() => getLocalStorageTodoData()); // it's state for store data and add data after present data.

const handleFormSubmit = (inputValue) =>{
    const {id, content, checked} = inputValue;

    // to check if the input field is empty or not
    if (!content) return; // it's means if value is empty don't add/store. 1st validation

    // to check if the data is already existing or not
    // if(task.includes(inputValue)) return; // it is check if data is available don't add. 2nd validation
    
    const ifTodoContentMatched = task.find(
        (curTask) => curTask.content === content
    );
    if(ifTodoContentMatched) return;

    setTask((prevTask) => [...prevTask , {id, content, checked}]); 
    //note :- if the key and value are the same in a javaScript object, u can use shorthand property names.
};

setLocalStorageTodoData(task);

// todo handleDeleteTodo function
const handleDeleteTodo = (value) =>{
    const updateTask =task.filter((curTask) => curTask.content !== value);
    setTask(updateTask);
};

// todo handleClearTodoData function

const handleClearTodoData = () => {
    setTask([]);
};

// todo handleCheckedTodo functionality
const handleCheckedTodo = (content) =>{
    const updatedTask = task.map((curTask) =>{
        if(curTask.content === content){
            return { ...curTask, checked: !curTask.checked};
        } else {
            return curTask;
        }
    });
    setTask(updatedTask);
};
  return (
   <>
        <section className='contianer'>
            <header>
                <h1>Todo List</h1>
            </header>

            <TodoForm onAddTodo={handleFormSubmit} />
            <section className='myOrdList'>
                <ul>
                    {
                        task.map((curTask, index)=>{
                            return (
                                <TodoList  
                                key={curTask.id} 
                                data={curTask.content}
                                checked={curTask.checked}
                                onHandleDeleteTodo={handleDeleteTodo}
                                onHandleCheckedTodo={handleCheckedTodo}
                                />
                            );
                            // in todolist these three are prop key, data, onHandleDeleteTodo

                        })
                    }
                </ul>
            </section>
            <section>
                <button className='clear-btn' onClick={handleClearTodoData}>
                    Clear All
                </button>
            </section>
        </section>
   </>
  );
};

export default Todo
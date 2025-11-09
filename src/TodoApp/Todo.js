import  { useEffect, useState} from 'react'

import "./Todo.css";
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { getLocalStorageTodoData, setLocalStorageTodoData } from './TodoLocalStorage';

const Todo = () => {
const [task, setTask] = useState(() => getLocalStorageTodoData()); // it's state for store data and add data after present data.
const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null); // it is for editing
const [editContent, setEditContent]= useState("") // ia is for holding editable content


    function handleFormSubmit(inputValue) {
        const { id, content, checked } = inputValue;

        // to check if the input field is empty or not
        if (!content) return; // it's means if value is empty don't add/store. 1st validation

         if (isEditing) {
      const updatedTask = task.map((curTask) =>
        curTask.id === editId ? { ...curTask, content } : curTask
      );
      setTask(updatedTask);
      setIsEditing(false);
      setEditId(null);
      setEditContent("");
      return;
    }

        // to check if the data is already existing or not
        // if(task.includes(inputValue)) return; // it is check if data is available don't add. 2nd validation
        const ifTodoContentMatched = task.find(
            (curTask) => curTask.content === content
        );
        if (ifTodoContentMatched) return;

        setTask((prevTask) => [...prevTask, { id, content, checked }]);
        //note :- if the key and value are the same in a javaScript object, u can use shorthand property names.
    }

useEffect(() => {
  setLocalStorageTodoData(task);
}, [task]);

// todo handleDeleteTodo function
const handleDeleteTodo = (value) =>{
    const updateTask =task.filter((curTask) => curTask.content !== value);
    setTask(updateTask);
};

// todo handleEditTodo functonality
const handleEditTodo = (content, id) => {
    setIsEditing(true);
    setEditId(id);
    setEditContent(content);
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
            <TodoForm onAddTodo={handleFormSubmit}  isEditing={isEditing}  editContent={editContent}/>

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
                                onHandleEditTodo={handleEditTodo} id={curTask.id}
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
import { useEffect, useState } from "react";

export const TodoForm = ({onAddTodo , isEditing, editContent}) => {
    const [inputValue , setInputValue] = useState({ 
        id: "",
        content: "",
        checked: false,
    }); // it's for initial value which is empty. after he changed in object
   
    // when we enter edit mode, pre- fill the input field

    useEffect(() =>{
        if(isEditing && editContent)
        {
            setInputValue({
                id: Date.now(),//
                //temporary id for edit mode (will be replaced)

                content : editContent,
                checked: false,
            });
        }
    }, [isEditing, editContent]);

    const handleInputChange = (value) =>{
        setInputValue({id: Date.now(), content: value, checked: false}); //replace value to Date.now()
    };

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        onAddTodo(inputValue);
        setInputValue({id: "", content: "", checked: false}); // 3rd validation
    };
    return (
                    <section className='form'>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <input type="text" className='todo-input' autoComplete='off' 
                                placeholder={isEditing ? "Edit your task..." : "Enter new task..."}
                                value={inputValue.content}
                                onChange={(event) => handleInputChange(event.target.value)}
                                />
                            </div>
                            <div>
                                {!isEditing ? (
                                     <button type='submit' className='todo-btn'>Add Task</button>
                                ) :(
                                      <button type="submit" className="edit-btn">Edit Task</button>
                                )}
                            </div>
                        </form>
                    </section>
    )
};
import { useState } from "react";

export const TodoForm = ({onAddTodo}) => {
    const [inputValue , setInputValue] = useState({}); // it's for initial value which is empty. after he changed in object

    const handleInputChange = (value) =>{
        setInputValue({id: value, content: value, checked: false});
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
                                value={inputValue.content}
                                onChange={(event) => handleInputChange(event.target.value)}
                                />
                            </div>
                            <div>
                                <button type='submit' className='todo-btn'>Add Task</button>
                            </div>
                        </form>
                    </section>
    )
};
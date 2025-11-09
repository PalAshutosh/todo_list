import { MdCheck, MdDeleteForever} from "react-icons/md";
// import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export const TodoList = ({
     data , 
     checked, 
     onHandleDeleteTodo, 
     onHandleCheckedTodo,
     onHandleEditTodo,
     id
    }) => {
    return (
        <li className='todo-item'>
            <span className={checked ? "checkList" : "notCheckList"}>{data}</span>
             <button className='check-btn' onClick={()=> onHandleCheckedTodo(data)}>
                < MdCheck/>
            </button>
            <button className='delete-btn' onClick={() => onHandleDeleteTodo(data)}>
                < MdDeleteForever/>
            </button>
            <button className='edit-btn1' onClick={() => onHandleEditTodo(data, id)}>
               <MdEdit />
            </button>
        </li>
    )
}
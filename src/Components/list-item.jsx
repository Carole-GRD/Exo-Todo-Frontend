import { useState } from 'react';
import style from './list-item.module.css';

const ListItem = ({_id, task, deleteTask, onHandleChecked}) => {

    const [isChecked, setIsChecked] = useState(true);
    // console.log(checked);

    const onDelete = () => {
        // console.log('tâches à supprimer');
        deleteTask(_id);
    }

    const handleChecked = () => {
        setIsChecked(!isChecked);
        // console.log(isChecked);
        onHandleChecked(_id, task);  
    }

    return (
        <>
            <div className={isChecked == false ? style.itemChecked : style.item}>
                <div>
                    <input 
                        value={isChecked}
                        onChange={handleChecked}
                        type="checkbox" />
                    <label className={isChecked == false ? style.textCheckedTask : ''} htmlFor="">{task}</label>
                </div>
                <div>
                    <button 
                        type='submit' 
                        onClick={onDelete}
                        className={isChecked == false ? style.btnCheckedTaskActif : style.btnCheckedTask}>
                            Supprimer
                    </button>
                </div>
            </div>
        </>
    )
};

export default ListItem;
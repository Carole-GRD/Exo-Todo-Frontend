import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './list.module.css';

import ListItem from './list-item';
import { useForm } from 'react-hook-form';


const List = () => {

    const { handleSubmit, register, reset } = useForm();

    const [list, setList] = useState([]);
    const [tasksToDelete, setTasksToDelete] = useState([]);
    
    //////////////////////////////////////////////////////////////////////////////////////
    /* Au chargement de la page, 
    on déclenche la fonction "setupList" qui permet d'afficher toutes les tâches crées */
    //////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        setupList();
    }, [])

    //////////////////////////////////////////////////////////////////////////////////////
    /* Fonction qui permet de mettre à jour de la liste des tâches 
    sans devoir à chaque fois réécrire la requête "axios" */
    ///////////////////////////////////////////////////////////////////////////////////////
    const setupList = () => {
        axios.get('http://localhost:8080/api/list')
            .then((response) => {
                // console.log(response.data);
                setList(response.data);
            })
    }

    //////////////////////////////////////////////////////////////////////////////////////
    // Ajouter un élément
    //////////////////////////////////////////////////////////////////////////////////////
    // AJOUTER UNE CONDITION POUR NE PAS AJOUTER UNE TACHE DEJA PRESENTE !!!!
    const onRegisterTaskToAdd = (data) => {
        // console.log('Ajouter une tâche');
        axios.post('http://localhost:8080/api/list', data)
            .then(function (response) {
                setupList();
            })
        reset();
    }

    //////////////////////////////////////////////////////////////////////////////////////
    // Supprimer UN élément 
    //////////////////////////////////////////////////////////////////////////////////////
    const onDeleteTask = (id) => {
        axios.delete(`http://localhost:8080/api/list/${id}`)
            .then(function (response) {
                setupList();
                setTasksToDelete(current => [...current.filter(task => task !== id)]);
            })
    }

    //////////////////////////////////////////////////////////////////////////////////////
    // Créer un tableau avec les éléments cochés 
    // (pour les supprimer par la suite - voir fonction "onDeleteTasksChecked" ci-dessous)
    //////////////////////////////////////////////////////////////////////////////////////
    const onListTasksChecked = (idTaskChecked, taskChecked) => {
        // console.log(idTaskChecked, taskChecked);
        /* Si la case était déjà cochée (la tâche se trouve dans le tableau des tâches à supprimer)
        et que l'utilisateur la décoche, alors on doit retirer la tâche de la liste des tâches à supprimer */
        if (tasksToDelete.includes(idTaskChecked)){
                setTasksToDelete(current => [...current.filter(task => task !== idTaskChecked)]);
        } 
        /* Si la case est cochée
        on ajoute la tâche de la liste des tâches à supprimer */
        else {
            setTasksToDelete(current => [...current.map(task => task), idTaskChecked]);
        }
    }
    // console.log(tasksToDelete);

    //////////////////////////////////////////////////////////////////////////////////////
    // Supprimer TOUS LES éléments cochés
    //////////////////////////////////////////////////////////////////////////////////////
    const onDeleteTasksChecked = () => {
        console.log('éléments à supprimer');
        console.log(tasksToDelete);
        tasksToDelete.forEach(id => 
        axios.delete(`http://localhost:8080/api/list/${id}`)
            .then(function () {
                setupList();
                setTasksToDelete([]);
            })
        )
    }


    return (
        <>  
            {/* //////////////////////////////////////// */}
            {/* {données statiques pour tester au début} */}
            {/* //////////////////////////////////////// */}

            {/* <div className={style.container}>
                <div className={style.list}>
                    <div>
                        <input type="checkbox" />
                        <label htmlFor="">Cours piano</label>
                    </div>
                    <div>
                        <input type="checkbox" />
                        <label htmlFor="">Match volley</label>
                    </div>
                    <div>
                        <input type="checkbox" />
                        <label htmlFor="">Rdv coiffeuse</label>
                    </div>
                </div>
            </div> */}

            {/* //////////////////////////////////////// */}
            {/* {données dynamiques basées sur les informations de la DB grâce aux reqêtes "axios"} */}
            {/* //////////////////////////////////////// */}

            <div className={style.container}>
                <div className={style.list}>

                    {list.map((task, _id) => (
                        <ListItem 
                            onHandleChecked={onListTasksChecked}
                            deleteTask={onDeleteTask} 
                            key={task._id} {...task} />
                    ))}

                    <form onSubmit={handleSubmit(onRegisterTaskToAdd)}>
                        <input id='task' type='text' {...register('task')} />
                        <button type='submit'>Ajouter</button>
                    </form>

                </div>
            </div>

            <div className={style.container}>
                <button type='submit' onClick={onDeleteTasksChecked}>Supprimer tous les éléments cochés</button>
            </div>
            
        </>
    )
};

export default List;
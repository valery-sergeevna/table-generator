import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import './FormState.scss';
import {createUserAction, saveUserAction} from '../../store/reducers/usersReducer';
import {useDispatch, useSelector} from "react-redux";
import {createTableAction, editUserFormOriginal} from "../../store/reducers/tableReducer";
import {EditForm} from "./EditForm/EditForm";
import {CreateForm} from "./CreateForm/CreateFrom";

const FormState = ({editForm, showEditForm, setLifting}) => {
    const dispatch = useDispatch();

    const list = useSelector(state=>state.users.usersList);
    const copies = useSelector(state=>state.tables.copies);
    const editedUserFromTable = useSelector(state=>state.users.editedUser);

    const [user, setUser] = useState({
        name: '',
        surname: '',
        age: '',
        city: '',
        id: ''
    });

    const [userEdited, setUserEdited] = useState({
        name: '',
        surname: '',
        age: '',
        city: '',
        id: ''
    });

    const [errors, setErrors] = useState({});
    const [errorFlag, setErrorFlag] = useState(false);

    const options = [
        { value: 'riga', label: 'Riga' },
        { value: 'daugavpils', label: 'Daugavpils' },
        { value: 'jūrmala', label: 'Jūrmala' },
        { value: 'ventspils', label: 'Ventspils' }
    ];

    const nameChangeHandler = (event) => {
        if(Object.values(editedUserFromTable).length){
            return setUserEdited({
                ...userEdited,
                name: event.target.value
            })
        }
        setUser({
            ...user,
            name: event.target.value
        })
    }

    const surnameChangeHandler = (event) => {
        if(Object.values(editedUserFromTable).length){
            return setUserEdited({
                ...userEdited,
                surname: event.target.value
            })
        }
        setUser({
            ...user,
            surname: event.target.value
        })
    }

    const ageChangeHandler = (event) => {
        if(Object.values(editedUserFromTable).length){
            return setUserEdited({
                ...userEdited,
                age: event.target.value
            })
        }
        setUser({
            ...user,
            age: event.target.value
        })
    }

    const cityChangeHandler = (value) => {
        if(Object.values(editedUserFromTable).length){
            return setUserEdited({
                ...userEdited,
                city: value
            })
        }
        setUser({
            ...user,
            city: value,
            id: new Date().getTime()
        })
    }

    const validate = (event, name, value) => {
        switch (name) {
            case 'name':
                if(value.length < 2){
                    setErrors({
                        ...errors,
                        name:'Username at least have 2 letters'
                    })
                }else{
                    setErrors(current => {
                        const copy = {...current};
                        delete copy.name;
                        return copy;
                    });
                }
                break;
            case 'surname':
                if(value.length <= 3){
                    setErrors({
                        ...errors,
                        surname:'Surname at least have 5 letters'
                    })
                }else{
                    setErrors(current => {
                        const copy = {...current};
                        delete copy.surname;
                        return copy;
                    });
                }
                break;

            case 'age':
                if(!/^\d+$/.test(value)){
                    setErrors({
                        ...errors,
                        age:'The field "Age" must contain only numbers'
                    })
                }else if(value === 0){
                    setErrors({
                        ...errors,
                        age:'Please write a number greater than 0'
                    })
                }else{
                    setErrors(current => {
                        const copy = {...current};
                        delete copy.age;
                        return copy;
                    });
                }
                break;
            default:
                break;
        }
        setErrorFlag( !errors.name && !errors.age && !errors.surname);
    }

    const checkSameUser = () => {
        return list.filter(person => person.name === user.name &&
            person.surname === user.surname && person.age === user.age && person.city.value === user.city.value).length;
    }

    const sendForm = (event) => {
        event.preventDefault();
        /*for (let name in user) {
            validate(event, name, user[name]);
        }*/
    }

    const addUser = (event) => {
        sendForm(event);
        if(!checkSameUser()){
            dispatch(createUserAction(user));
            dispatch(createTableAction(user));
            setUser({
                name: '',
                surname: '',
                age: '',
                city: '',
            })
        }
    }

    const editUser = (event) => {
        setLifting();
        console.log(copies, 'editUser');
        sendForm(event);
        dispatch(saveUserAction(userEdited));
        showEditForm(false);
    }
    return (
        <>
            <CreateForm addUser={addUser}
                errors={errors}
                user={user}
                options={options}
                nameChangeHandler={nameChangeHandler}
                surnameChangeHandler={surnameChangeHandler}
                ageChangeHandler={ageChangeHandler}
                cityChangeHandler={cityChangeHandler}/>
            {editForm &&
                <div className="modal">
                    <EditForm errors={errors}
                              editedUserFromTable={editedUserFromTable}
                              userEdited={userEdited}
                              options={options}
                              nameChangeHandler={nameChangeHandler}
                              surnameChangeHandler={surnameChangeHandler}
                              ageChangeHandler={ageChangeHandler}
                              cityChangeHandler={cityChangeHandler}
                              editUser={editUser}
                              setUserEdited={(user)=>setUserEdited(user)}/>
                </div>}
        </>
    );
};

export default FormState;
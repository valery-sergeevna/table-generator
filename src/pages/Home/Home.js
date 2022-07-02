import React, {useState} from 'react';
import './Home.scss'
import {MainTable, FormState, Alert, FormTwo} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {createUserAction, saveUserAction} from "../../store/reducers/usersReducer";
import {createTableAction} from "../../store/reducers/tableReducer";
import {validate} from '../../helpers/validation';
import {options} from '../../helpers/options';

const Home = () => {
    const [alert, setAlert] = useState(false);
    const [editForm, showEditForm] = useState(false);
    const [lifting, setLifting] = useState(false);
    const dispatch = useDispatch();

    const list = useSelector(state=>state.users.usersList);
    const editedUserFromTable = useSelector(state=>state.users.editedUser);
    const [errors, setErrors] = useState({});
    const [errorsEdited, setErrorsEdited] = useState({});

    const formTwoFlag = true;

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

    const onChange = (e, city) => {
        const name = city ? city : e.target.name;
        const value = city ? e : e.target.value;
        const checkAge = name === 'age';
        if(Object.values(editedUserFromTable).length){
            return setUserEdited({
                ...userEdited,
                [name]: checkAge ? value.replace(/^\D+$/gm, '') : value,
            })
        }
        setUser({
            ...user, [name]: checkAge ? value.replace(/^\D+$/gm, '') : value, id: new Date().getTime()
        })
    }

    const checkSameUser = () => {
        return list.filter(person => person.name === user.name &&
            person.surname === user.surname && person.age === user.age && person.city.value === user.city.value).length;
    }

    const addUser = (event) => {
        event.preventDefault();
        if(checkSameUser()){
            setAlert("CREATE_SAME_USER");
        }
        if(!checkSameUser() && validate(user, setErrors)){
            dispatch(createUserAction(user));
            dispatch(createTableAction(user));
            setUser({
                ...user,
                name: '',
                surname: '',
                age: '',
                city: '',
            })
            setErrors({});
        }
    }

    const editUser = (event) => {
        event.preventDefault();
        if(validate(userEdited, setErrors, setErrorsEdited, true)){
            setLifting(!lifting);
            dispatch(saveUserAction(userEdited));
            showEditForm(false);
            setErrorsEdited({});
        }
    }

    const closeModalEdited = () => {
        showEditForm(false);
    }
    return (
        <div className="home">
            <div className="home__app">
                <FormState editForm={editForm}
                           closeModalEdited={closeModalEdited}
                           errors={errors}
                           errorsEdited={errorsEdited}
                           addUser={addUser}
                           user={user}
                           options={options}
                           onChange={onChange}
                           editedUserFromTable={editedUserFromTable}
                           userEdited={userEdited}
                           editUser={editUser}
                           setUserEdited={setUserEdited}
                           setAlert={(elem)=>setAlert(elem)}/>
                {alert &&
                    <Alert
                        action={alert}
                        setAlert={()=>setAlert(false)}/>}
            </div>
            <MainTable lifting={lifting}
                       showEditForm={(bool)=>showEditForm(bool)}
                       setAlert={(elem)=>setAlert(elem)}/>
            <FormTwo addUser={addUser}
                     errors={errors}
                     user={user}
                     options={options}
                     onChange={onChange}
                     formTwoFlag={formTwoFlag}/>
        </div>
    );
};

export default Home;
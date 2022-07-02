import React, {useState} from 'react';
import './Home.scss'
import {MainTable, FormState} from "../../components";
import Alert from "../../components/Alert/Alert";
import {useDispatch, useSelector} from "react-redux";
import {createUserAction, saveUserAction} from "../../store/reducers/usersReducer";
import {createTableAction} from "../../store/reducers/tableReducer";
import {validate} from '../../helpers/validation';
import {options} from '../../helpers/options';
import FormTwo from "../../components/FormTwo/FormTwo";

const Home = () => {
    const [modalDelete, showModalDelete] = useState(false);
    const [editForm, showEditForm] = useState(false);
    const [lifting, setLifting] = useState(false);
    const dispatch = useDispatch();

    const list = useSelector(state=>state.users.usersList);
    const copies = useSelector(state=>state.tables.copies);
    const editedUserFromTable = useSelector(state=>state.users.editedUser);

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

    const [errors, setErrors] = useState({});
    const [errorFlag, setErrorFlag] = useState(false);

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

    const sendForm = (event) => {
        event.preventDefault();
        for (let name in user) {
            validate(event, name, user[name], errors, setErrors, setErrorFlag);
        }
    }

    const addUser = (event) => {
        sendForm(event);
        if(!checkSameUser()){
            dispatch(createUserAction(user));
            dispatch(createTableAction(user));
            setUser({
                ...user,
                name: '',
                surname: '',
                age: '',
                city: '',
            })
        }
    }

    const editUser = (event) => {
        setLifting(!lifting);
        sendForm(event);
        console.log(lifting, 'lifting');
        dispatch(saveUserAction(userEdited));
        showEditForm(false);
    }
    return (
        <div className="home">
           <FormState editForm={editForm}
                      showEditForm={(bool)=>showEditForm(bool)}
                      errors={errors}
                      addUser={addUser}
                      user={user}
                      options={options}
                      onChange={onChange}
                      editedUserFromTable={editedUserFromTable}
                      userEdited={userEdited}
                      editUser={editUser}
                      setUserEdited={setUserEdited}/>
           <MainTable showModalDelete={showModalDelete}
                      lifting={lifting}
                      showEditForm={(bool)=>showEditForm(bool)}/>
           <FormTwo addUser={addUser} errors={errors} user={user} options={options} onChange={onChange} formTwoFlag={formTwoFlag}/>
            {/*{modalDelete && <Alert/>}*/}
        </div>
    );
};

export default Home;
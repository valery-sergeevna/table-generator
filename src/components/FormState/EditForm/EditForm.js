import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import Select from 'react-select';
import {editUserFormOriginal} from "../../../store/reducers/tableReducer";
import {useDispatch, useSelector} from "react-redux";
export const EditForm = props => {
    const dispatch = useDispatch();
    const editedUser = useSelector(state=>state.users.editedUser);
    const {errors, editedUserFromTable, options, editUser, userEdited,onChange, setUserEdited} = props;
    const allDataUserTable = editedUserFromTable.name && editedUserFromTable.surname && editedUserFromTable.age && editedUserFromTable.city.length,
        allDataForm = userEdited.name && userEdited.surname && userEdited.age && userEdited.city.length;

    useEffect(()=>{
        setUserEdited({
            name: editedUserFromTable.name,
            surname: editedUserFromTable.surname,
            age: editedUserFromTable.age,
            city: editedUserFromTable.city,
            id: editedUserFromTable.id})
    }, []);

    return (
        <form className="form" onSubmit={(e) => editUser(e)}>
            <input type="text" name="name" className={`form__input field ${errors.name && 'error'}`} placeholder="Name" value={userEdited.name} onChange={onChange} />
            <p className="form__error">{errors.name}</p>
            <input type="text" name="surname" className={`form__input field ${errors.surname && 'error'}`} placeholder="Surname" value={userEdited.surname} onChange={onChange}/>
            <p className="form__error">{errors.surname}</p>
            <input type="text" name="age" className={`form__input field ${errors.age && 'error'}`}  placeholder="Age" value={userEdited.age} onChange={onChange}/>
            <p className="form__error">{errors.age}</p>
            <Select
                placeholder="Select Option"
                value={userEdited.city}
                options={options}
                classNamePrefix='select'
                onChange={(event)=>onChange(event, 'city')}
            />
            <button disabled={allDataUserTable || allDataForm} type="submit" className="button">EDIT</button>
        </form>
    )
}

EditForm.propTypes = {
    editedUserFromTable: PropTypes.object.isRequired,
    userEdited: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    editUser:PropTypes.func.isRequired,
};
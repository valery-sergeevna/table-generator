import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import Select from 'react-select';
import {customStyles} from "../../../helpers/optionStyles";
export const EditForm = props => {
    const {errors, editedUserFromTable, options, editUser, userEdited,onChange, setUserEdited, closeModalEdited} = props;
    const disabled = Object.values(userEdited).some(value=>!value);

    useEffect(()=>{
        setUserEdited({
            name: editedUserFromTable.name,
            surname: editedUserFromTable.surname,
            age: editedUserFromTable.age,
            city: editedUserFromTable.city,
            id: editedUserFromTable.id})
    }, [editedUserFromTable]);

    return (
        <div className="modal__dialog">
            <svg className="modal__close" onClick={closeModalEdited} xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 50 50" width="50px" height="50px"><path style={{fill: '#FFFFFF', stroke: '#FFFFFF'}} d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
            <form className="form" onSubmit={(e) => editUser(e)}>
                <input type="text" name="name" className={`form__input field ${errors.nameError && 'error'}`} placeholder="Name" value={userEdited.name} onChange={onChange} />
                {errors.nameError &&<p className="form__error">{errors.nameError}</p>}
                <input type="text" name="surname" className={`form__input field ${errors.surnameError && 'error'}`} placeholder="Surname" value={userEdited.surname} onChange={onChange}/>
                {errors.surnameError && <p className="form__error">{errors.surnameError}</p>}
                <input type="text" name="age" className={`form__input field ${errors.ageError && 'error'}`}  placeholder="Age" value={userEdited.age} onChange={onChange}/>
                {errors.ageError && <p className="form__error">{errors.ageError}</p>}
                <Select
                    placeholder="Select Option"
                    value={userEdited.city}
                    options={options}
                    classNamePrefix='select'
                    onChange={(event)=>onChange(event, 'city')}
                    styles={customStyles}
                />
                <button disabled={disabled} type="submit" className="button">EDIT</button>
            </form>
        </div>
    )
}

EditForm.propTypes = {
    editedUserFromTable: PropTypes.object.isRequired,
    userEdited: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    editUser:PropTypes.func.isRequired,
    setUserEdited:PropTypes.func.isRequired,
    closeModalEdited:PropTypes.func.isRequired
};
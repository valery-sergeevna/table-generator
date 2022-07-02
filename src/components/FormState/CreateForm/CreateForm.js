import React from "react";
import * as PropTypes from "prop-types";
import Select from 'react-select';
import {customStyles} from "../../../helpers/optionStyles";
export const CreateForm = props => {
    const {addUser, errors, user, options, onChange, formTwoFlag} = props;


    return (
        <form className={`form ${formTwoFlag ? 'form-two' : ''}`} onSubmit={(e)=>addUser(e)}>
            <div className="form__container form-two__container">
                <div className="form-two__block">
                    <input type="text" name="name" className={`form__input field ${errors.nameError ? 'error' : ''}`} placeholder="Name" value={user.name} onChange={onChange}/>
                    {errors.nameError && <p className="form__error">{errors.nameError}</p>}
                </div>
                <div className="form-two__block">
                    <input type="text" name="surname" className={`form__input field ${errors.surnameError ? 'error' : ''}`} placeholder="Surname" value={user.surname} onChange={onChange}/>
                    {errors.surnameError && <p className="form__error">{errors.surnameError}</p>}
                </div>
            </div>
            <div className="form__container form-two__container">
                <div className="form-two__block">
                    <input type="text" name="age" className={`form__input field ${errors.ageError ? 'error' : ''}`}  placeholder="Age" value={user.age} onChange={onChange}/>
                    {errors.ageError && <p className="form__error">{errors.ageError}</p>}
                </div>
                <Select
                    styles={customStyles}
                    placeholder="Select Option"
                    value={user.city}
                    options={options}
                    classNamePrefix='select'
                    onChange={(event)=>onChange(event, 'city')}
                />
            </div>
            <button disabled={Object.values(user).some(value=>!value)} type="submit" className="button">ADD</button>
        </form>
    )
}

CreateForm.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    addUser: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    formTwoFlag: PropTypes.bool,
};
import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import Select from 'react-select';
export const CreateForm = props => {
    const {addUser, errors, user, nameChangeHandler, surnameChangeHandler, ageChangeHandler, cityChangeHandler, options} = props;
    return (
        <form className="form" onSubmit={(e)=>addUser(e)}>
            <input type="text" name="name" className={`form__input field ${errors.name && 'error'}`} placeholder="Name" value={user.name} onChange={(e)=>nameChangeHandler(e)} ></input>
            <p className="form__error">{errors.name}</p>
            <input type="text" name="surname" className={`form__input field ${errors.surname && 'error'}`} placeholder="Surname" value={user.surname} onChange={(e)=>surnameChangeHandler(e)}></input>
            <p className="form__error">{errors.surname}</p>
            <input type="text" name="age" className={`form__input field ${errors.age && 'error'}`}  placeholder="Age" value={user.age} onChange={(e)=>ageChangeHandler(e)}></input>
            <p className="form__error">{errors.age}</p>
            <Select
                placeholder="Select Option"
                value={user.city}
                options={options}
                classNamePrefix='select'
                onChange={cityChangeHandler}
            />
            <button disabled={user.name && user.surname && user.age && user.city.length} type="submit" className="button">ADD</button>
        </form>
    )
}

CreateForm.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    addUser: PropTypes.func.isRequired,
    nameChangeHandler: PropTypes.func,
    surnameChangeHandler: PropTypes.func.isRequired,
    ageChangeHandler: PropTypes.func.isRequired,
    cityChangeHandler: PropTypes.func.isRequired
};
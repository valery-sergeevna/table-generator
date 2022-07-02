import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import Select from 'react-select';
export const CreateForm = props => {
    const {addUser, errors, user, options, onChange, formTwoFlag} = props;
    return (
        <form className={`form ${formTwoFlag ? 'form-two' : ''}`} onSubmit={(e)=>addUser(e)}>
            <div className="form__container form-two__container">
                <div className="form-two__block">
                    <input type="text" name="name" className={`form__input field ${errors.name ? 'error' : ''}`} placeholder="Name" value={user.name} onChange={onChange}/>
                    {errors.name && <p className="form__error">{errors.name}</p>}
                </div>
                <div className="form-two__block">
                    <input type="text" name="surname" className={`form__input field ${errors.surname ? 'error' : ''}`} placeholder="Surname" value={user.surname} onChange={onChange}/>
                    {errors.surname && <p className="form__error">{errors.surname}</p>}
                </div>
            </div>
            <div className="form__container form-two__container">
                <div className="form-two__block">
                    <input type="text" name="age" className={`form__input field ${errors.age ? 'error' : ''}`}  placeholder="Age" value={user.age} onChange={onChange}/>
                    {errors.age && <p className="form__error">{errors.age}</p>}
                </div>
                <Select
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
    onChange: PropTypes.func,
};
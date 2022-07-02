import React from 'react';
import {CreateForm} from "../FormState/CreateForm/CreateForm";
import * as PropTypes from "prop-types";
import {customStyles} from "../../helpers/optionStyles";

const FormTwo = (props) => {
    const {addUser, errors, user, options, onChange, formTwoFlag} = props;
    return (
        <>
            <CreateForm addUser={addUser}
                        errors={errors}
                        user={user}
                        options={options}
                        onChange={onChange}
                        formTwoFlag={formTwoFlag}/>
        </>
    );
};

export default FormTwo;

FormTwo.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    addUser: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    formTwoFlag: PropTypes.bool.isRequired,
};
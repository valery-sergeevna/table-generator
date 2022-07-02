import React from 'react';
import {CreateForm} from "../FormState/CreateForm/CreateFrom";

const FormTwo = ({addUser, errors, user, options, onChange, formTwoFlag}) => {
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
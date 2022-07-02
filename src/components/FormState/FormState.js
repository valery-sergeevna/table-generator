import React from 'react';
import './FormState.scss';
import {EditForm} from "./EditForm/EditForm";
import {CreateForm} from "./CreateForm/CreateForm";
import * as PropTypes from "prop-types";

const FormState = (props) => {
    const {editForm, addUser, errors, errorsEdited, user, options, onChange, editedUserFromTable, userEdited, editUser, setUserEdited ,closeModalEdited} = props;
    return (
        <>
            <CreateForm addUser={addUser}
                errors={errors}
                user={user}
                options={options}
                        onChange={onChange}/>
            {editForm &&
                <div className="modal">
                    <EditForm errors={errorsEdited}
                              editedUserFromTable={editedUserFromTable}
                              userEdited={userEdited}
                              options={options}
                              editUser={editUser}
                              setUserEdited={(user)=>setUserEdited(user)}
                              onChange={onChange}
                              closeModalEdited={closeModalEdited}/>
                </div>}
        </>
    );
};

export default FormState;

FormState.propTypes = {
    editForm: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    userEdited: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    editUser:PropTypes.func.isRequired,
    setUserEdited:PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    addUser: PropTypes.func.isRequired,
    editedUserFromTable: PropTypes.object,
    closeModalEdited:PropTypes.func,
    errorsEdited: PropTypes.object,
};
import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import './FormState.scss';
import {EditForm} from "./EditForm/EditForm";
import {CreateForm} from "./CreateForm/CreateFrom";

const FormState = ({editForm, addUser, errors, user, options, onChange, editedUserFromTable,
                       userEdited, editUser, setUserEdited}) => {
    return (
        <>
            <CreateForm addUser={addUser}
                errors={errors}
                user={user}
                options={options}
                        onChange={onChange}/>
            {editForm &&
                <div className="modal">
                    <EditForm errors={errors}
                              editedUserFromTable={editedUserFromTable}
                              userEdited={userEdited}
                              options={options}
                              editUser={editUser}
                              setUserEdited={(user)=>setUserEdited(user)}
                              onChange={onChange}/>
                </div>}
        </>
    );
};

export default FormState;
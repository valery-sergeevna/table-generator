import React, {useEffect, useState} from 'react';
import './MainTable.scss';
import {useSelector, useDispatch} from "react-redux";
import {
    copyTableAction,
    deleteTableAction,
    deleteUserFromCopies,
    deleteUserFromOriginal, editUserFromCopy,
    editUserFromOriginal
} from '../../store/reducers/tableReducer';
import {Table} from "../../UI/Table";
import {saveUserAction} from "../../store/reducers/usersReducer";
import * as PropTypes from "prop-types";
import FormTwo from "../FormTwo/FormTwo";

const MainTable = (props) => {
    const {showEditForm, lifting, setAlert} = props;
    const originalTable = useSelector(state=>state.tables.originalTable);
    const editedUser = useSelector(state=>state.users.editedUser);
    const copies = useSelector(state=>state.tables.copies);
    const dispatch = useDispatch();
    const [tableEditId, setTableEditId] = useState(null);

    useEffect(()=>{
        if(!!Object.keys(editedUser).length){
            if(tableEditId){
                dispatch(editUserFromCopy(editedUser, tableEditId));
                dispatch(saveUserAction({}));
            }else{
                dispatch(editUserFromOriginal(editedUser));
                dispatch(saveUserAction({}));
            }
            setAlert("EDIT_USER");
        }
    }, [lifting]);

    const copyTable = (data, index, copyFromCopies) => {
        dispatch(copyTableAction(data.table, index, copyFromCopies));
        setAlert("COPY_TABLE");
    }
    const deleteTableCopy = (alertAction, id) => {
        if(id){
            dispatch(deleteTableAction(id));
        }
        setAlert(alertAction);
    }
    const deleteUser = (elem, id) => {
        if(elem.id === originalTable.id){
            dispatch((deleteUserFromOriginal(id)));
        }else{
            dispatch((deleteUserFromCopies(id, elem)));
        }
        setAlert("DELETE_USER");
    }
    const editUserObj = (user, id) => {
        showEditForm(true);
        dispatch(saveUserAction(user));
        setTableEditId(id);
    }

    return (
        <div className="container">
            {originalTable && originalTable.table && originalTable.table.length
                ?
                <Table table={originalTable.table}
                       copyTable={()=>{copyTable(originalTable)}}
                       key={originalTable.id}
                       deleteUser={(id)=>deleteUser(originalTable, id)}
                       editUserObj={(user)=>editUserObj(user)}
                       deleteTableCopy={()=>{deleteTableCopy("REJECT")}}/>
                :
                <h4>Users and tables are not found. Please fill out the form.</h4>}
            {copies && !!copies.length && copies.map((elem, index)=>
                (<Table
                    table={elem.table}
                    key={elem.id}
                    copyTable={()=>{copyTable( elem, index, true)}}
                    deleteTableCopy={()=>{deleteTableCopy("DELETE_TABLE", elem.id)}}
                    deleteUser={(id)=>deleteUser(elem, id)}
                    editUserObj={(user)=>editUserObj(user, elem.id)}/>))}
        </div>
    );
};

export default MainTable;

MainTable.propTypes = {
    showEditForm:PropTypes.func.isRequired,
    lifting: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};
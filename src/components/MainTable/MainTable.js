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

const MainTable = ({showModalDelete, showEditForm, lifting}) => {
    const originalTable = useSelector(state=>state.tables.originalTable);
    const editedUser = useSelector(state=>state.users.editedUser);
    const copies = useSelector(state=>state.tables.copies);
    const dispatch = useDispatch();
    const [userId, setUserId] = useState();
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
        }
    }, [lifting]);

    const copyTable = (data, index, copyFromCopies) => {
        dispatch(copyTableAction(data.table, index, copyFromCopies));
        console.log(copies)
    }
    const deleteTableCopy = (id) => {
        dispatch(deleteTableAction(id))
    }
    const saveUserId = (id) => {
        setUserId(id);
    }
    const deleteUser = (elem, id) => {
        if(elem.id === originalTable.id){
            dispatch((deleteUserFromOriginal(id)));
        }else{
            dispatch((deleteUserFromCopies(id, elem)));
        }
    }
    const editUserObj = (user, id) => {
        showEditForm(true);
        dispatch(saveUserAction(user));
        setTableEditId(id);
        console.log(copies, 'click')
    }

    return (
        <div className="container">
            {originalTable && originalTable.table && originalTable.table.length
                ?
                <Table table={originalTable.table}
                       copyTable={()=>{copyTable(originalTable)}}
                       key={originalTable.id}
                       deleteUser={(id)=>deleteUser(originalTable, id)}
                       editUserObj={(user)=>editUserObj(user)}>
                </Table>
                :
                <h4>Users and tables are not found. Please fill out the form.</h4>}
                {copies && !!copies.length && copies.map((elem, index)=>
                    (<Table
                        table={elem.table}
                        key={elem.id}
                        copyTable={()=>{copyTable(elem, index, true)}}
                        deleteTableCopy={()=>{deleteTableCopy(elem.id)}}
                        deleteUser={(id)=>deleteUser(elem, id)}
                        editUserObj={(user)=>editUserObj(user, elem.id)}>
                </Table>))}
        </div>
    );
};

export default MainTable;
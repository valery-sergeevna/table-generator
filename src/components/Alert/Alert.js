import React, {useEffect, useState} from 'react';
import './Alert.scss';
import * as PropTypes from "prop-types";
import {CreateForm} from "../FormState/CreateForm/CreateForm";

const Alert = ({action, setAlert}) => {
    const [alertData, setAlertData] = useState({});
    useEffect(()=>{
        switch(action) {
            case "COPY_TABLE":
                setAlertData({text:'The table was successfully copied', color: 'rgba(25,255,25,0.7)'});
                break;
            case "DELETE_TABLE":
                setAlertData({text:'The table was successfully deleted', color: 'rgba(25,255,25,0.7)'});
                break;
            case "REJECT":
                setAlertData({text:'You cannot delete the main table', color: 'rgba(255, 25, 39, 0.7)'});
                break;
            case "DELETE_USER":
                setAlertData({text:'The user was successfully deleted', color: 'rgba(25,255,25,0.7)'});
                break;
            case "EDIT_USER":
                setAlertData({text:'The user was successfully edited', color: 'rgba(25,255,25,0.7)'});
                break;
            case "CREATE_SAME_USER":
                setAlertData({text:'This user is already in the database', color: 'rgba(255, 25, 39, 0.7)'});
                break;
        }


        let timer = setTimeout(() => {
            setAlertData({});
            setAlert();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };

    }, [action]);
    return (
        <>
            {!!Object.keys(alertData).length && alertData.text.length &&
            <div className="alert" style={{backgroundColor: `${alertData.color}`}}>
                {alertData.text}
            </div>}
        </>
    );
};

export default Alert;

Alert.propTypes = {
    action: PropTypes.string.isRequired,
    setAlert: PropTypes.func.isRequired,
};
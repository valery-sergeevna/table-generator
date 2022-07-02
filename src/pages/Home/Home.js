import React, {useState} from 'react';
import './Home.scss'
import {MainTable, FormState} from "../../components";
import Alert from "../../components/Alert/Alert";

const Home = ({isMobile}) => {
    const [modalDelete, showModalDelete] = useState(false);
    const [editForm, showEditForm] = useState(false);
    const [lifting, setLifting] = useState(false);
    return (
        <div className="home">
           <FormState editForm={editForm}
                      setLifting={()=>setLifting(!lifting)}
                      showEditForm={(bool)=>showEditForm(bool)}/>
           <MainTable showModalDelete={showModalDelete}
                      lifting={lifting}
                      showEditForm={(bool)=>showEditForm(bool)}/>
            {/*{modalDelete && <Alert/>}*/}
        </div>
    );
};

export default Home;
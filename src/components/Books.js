import React , {useState , useEffect} from 'react';
import './Books.css';
import Divider from '@mui/material/Divider';
import Table from './Table';
import {Route,Routes} from 'react-router-dom';
import Details from './Details';


const Books = () => {

    return (
        <div className='library'>
            <h2 className='header'>Library Management</h2>      
            <hr style={{width:"100%"}}/>
            <Routes>
            <Route path = '/' element = {<Table/> }/>
            <Route path = "/details/:id" element = {<Details/>}/>          
             </Routes> 
        </div>
    )
}

export default Books
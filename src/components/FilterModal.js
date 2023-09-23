// FilterPopup.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './FilterModal.css';

const customStyles = {
    content: {
      top: '50%', 
      left: '50%', 
      right: 'auto',
      bottom: 'auto', 
      transform: 'translate(-50%, -50%)', 
      minHeight: '40%', 
      width: '80%', 
    },
  };
const FilterPopup = ({ isOpen,onRequestClose,applyFilter }) => {
   
    const [attribute,setAttribute] = useState('');
    const [relation , setRelation] = useState('');
    const [value,setValue] = useState('');
    
    

    const handleFilterAtt = (e) => {
        setAttribute(e.target.value);
    }
    const handleFilterRelation = (e) => {
        debugger
        setRelation(e.target.value)
    }
    const handleFilterValue = (e) => {
        setValue(e.target.value)
    }
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      contentLabel="Filter Popup"
    >
      <div>
       <h1>Filter</h1>
      </div>
      <div className='filter-container'>
        <select onChange={(e) => handleFilterAtt(e)}>
            <option>Attribute</option>
            <option value="title">Title</option>
            <option value = "author">Author</option>
            <option value = "genre">Genre</option>
        </select>
        <select onChange={(e) => handleFilterRelation(e)}>
            <option>Relations</option>
            <option>equals</option>
            <option>not equal</option>
            <option>contains</option>
           
        </select>
        <input type="text" onChange={(e) => handleFilterValue(e)} placeholder="Value"/>
      </div>
      <div className='filter-btn'>
      <button onClick={() => applyFilter({attribute,relation,value})}>Apply</button>
      <button onClick={onRequestClose}>Close</button>
      </div>
      
    </Modal>
  );
};

export default FilterPopup;

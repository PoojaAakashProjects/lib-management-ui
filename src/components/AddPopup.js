import React, { useState } from 'react';
import './Add.css';

const AddPopup = ({ onAdd ,onCancel}) => {
  const [savedData, setSavedData] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSavedData({ ...savedData,[name]: value });
  };

  const handleSave = () => {
    onAdd(savedData);
  };

  return (
    <div className="add-popup">
        <h2>Add Data</h2>
        <input placeholder='Title' type="text" name="title"  onChange={handleInputChange}  />
        <input placeholder="Author" type="text" name="author"  onChange={handleInputChange} />
        <input placeholder="Genre" type="text" name="genre"  onChange={handleInputChange} />
        <input placeholder="Description" type="text-area" name="description"  onChange={handleInputChange} />
        <input placeholder="Publication Year" type="text" name="publicationYear"  onChange={handleInputChange} />
    <div className='add-btn'>
    <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
     
    </div>
  );
};

export default AddPopup;

import React, { useState } from 'react';
import './Edit.css';

const EditPopup = ({ data, onSave ,onCancel}) => {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className="edit-popup">
        <h2>Edit Data</h2>
        <input type="text" name="title" value={editedData.title} onChange={handleInputChange}  />
        <input type="text" name="author" value={editedData.author} onChange={handleInputChange} />
        <input type="text" name="genre" value={editedData.genre} onChange={handleInputChange} />
        <input type="text" name="publicationYear" value={editedData.publicationYear} onChange={handleInputChange} />
     <div className='edit-btn'>
     <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
     </div>
      
    </div>
  );
};

export default EditPopup;

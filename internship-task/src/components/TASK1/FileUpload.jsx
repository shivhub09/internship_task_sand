import React from 'react';
import './FileUpload.css'; 




const FileUpload = ({ onFileUpload }) => (
  <div className="file-upload">
    <input
      className="file-input"
      type="file"
      onChange={(e) => onFileUpload(e.target.files[0])}
    />
  </div>
);

export default FileUpload;

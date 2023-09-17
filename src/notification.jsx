import React, { useState } from 'react';

const Notifications = () => {
  const [isUploaded, setIsUploaded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('file');
    const descriptionInput = document.getElementById('description');
    const companyNameInput = document.getElementById('company');

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('description', descriptionInput.value);
    formData.append('companyName', companyNameInput.value);

    try {
      const response = await fetch('http://localhost:3003/upload', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        setIsUploaded(true);
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Select File:</label>
          <input type="file" name="file" id="file" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea name="description" id="description" rows="4" cols="50" className="form-control"></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company Name:</label>
          <input type="text" name="companyName" id="company" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      {isUploaded && <p>File uploaded successfully!</p>}
    </div>
  );
};

export default Notifications;
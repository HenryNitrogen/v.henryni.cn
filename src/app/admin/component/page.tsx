"use client";

import React, { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resubmit, setResubmit] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    if (!title) {
      alert("Please enter a title.");
      return;
    }
    if (!description) {
      alert("Please enter a description.");
      return;
    }
    if (!thumbnail) {
      alert("Please select a thumbnail image.");
      return;
    }
    if (!resubmit) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);
    
        const res = await fetch('/api/uploadvideo', {
          method: 'POST',
          body: formData,
        });
    
        const data = await res.json();
        alert(data.url)
        console.log('File uploaded successfully:', data);
        setResubmit(true);
    }else{
        return alert("You have already submitted the video. Please wait for processing.");

    }
    

   
  };

  return (
    <div className="m-20 mt-30">
      <h1>Upload Page</h1>
      <p>Welcome to the upload page!</p>
      <div>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

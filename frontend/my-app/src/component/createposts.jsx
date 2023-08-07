import React, { useState } from 'react';
import Swal from 'sweetalert2';
import "../css/createpost.css"

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:4500/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":`${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        // Post created successfully, you can redirect or show a success message
        console.log('Post created successfully');
        Swal.fire("Post created successfully")
        setTitle('');
        setContent('');
      } else {
        console.error('Error creating post:', response.statusText);
        Swal.fire("Please Login First!")
      }
    } catch (error) {
      console.error('Error creating post:', error);
      Swal.fire("Please Login First")
    }
  };

  return (
    <div className="create-post">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;

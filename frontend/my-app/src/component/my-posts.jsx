// import React, { useState, useEffect } from 'react';
// import "../css/my-posts.css"

// const MyPosts = () => {
//   const [userPosts, setUserPosts] = useState([]);
//   const [editMode, setEditMode] = useState({});

//   useEffect(() => {
//     fetchUserPosts();
//   }, []);

//   const fetchUserPosts = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:4500/posts/my-posts', {
//         headers: {
//             'Content-Type': 'application/json',
//           Authorization: ` ${localStorage.getItem('token')}`,
//         },
//       });
//       const data = await response.json();
//       console.log(data)
//       setUserPosts(data);
//     } catch (error) {
//       console.error('Error fetching user posts:', error);
//     }
//   };

//   const toggleEditMode = (postId) => {
//     setEditMode((prevMode) => ({
//       ...prevMode,
//       [postId]: !prevMode[postId],
//     }));
//   };

//   const handleUpdate = async (postId, updatedTitle, updatedContent) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4500/posts/${postId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: ` ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
//       });

//       if (response.ok) {
//         // Refresh the user's posts to reflect the update
//         fetchUserPosts();
//         toggleEditMode(postId); // Close the edit mode
//       } else {
//         console.error('Error updating post:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error updating post:', error);
//     }
//   };

//   const handleDelete = async (postId) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4500/posts/${postId}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//           Authorization: `${localStorage.getItem('token')}`,
//         },
//       });

//       if (response.ok) {
//         // Refresh the user's posts to reflect the deletion
//         fetchUserPosts();
//       } else {
//         console.error('Error deleting post:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   return (
//     <div className="my-posts">
//       <h2>Your Posts</h2>
//       <ul>
//         {userPosts.map((post) => (
//           <li key={post.id}>
//             <h3>{editMode[post.id] ? <input type="text" defaultValue={post.title} /> : post.title}</h3>
//             <p>{editMode[post.id] ? <textarea defaultValue={post.content} /> : post.content}</p>
//             {editMode[post.id] ? (
//               <button onClick={() => handleUpdate(post.id)}>Save</button>
//             ) : (
//               <>
//                 <button onClick={() => toggleEditMode(post.id)}>Edit</button>
//                 <button onClick={() => handleDelete(post.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyPosts;

import React, { useState, useEffect } from 'react';
import "../css/my-posts.css"

const MyPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState({});
  const [updatedContent, setUpdatedContent] = useState({});

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4500/posts/my-posts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUserPosts(data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const toggleEditMode = (postId) => {
    setEditMode((prevMode) => ({
      ...prevMode,
      [postId]: !prevMode[postId],
    }));
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://127.0.0.1:4500/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Refresh the user's posts to reflect the deletion
        fetchUserPosts();
      } else {
        console.error('Error deleting post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = async (postId) => {
    try {
      const response = await fetch(`http://127.0.0.1:4500/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: updatedTitle[postId] || userPosts.find(post => post.id === postId).title,
          content: updatedContent[postId] || userPosts.find(post => post.id === postId).content,
        }),
      });

      if (response.ok) {
        fetchUserPosts();
        toggleEditMode(postId);
        setUpdatedTitle((prevTitles) => ({
          ...prevTitles,
          [postId]: '',
        }));
        setUpdatedContent((prevContents) => ({
          ...prevContents,
          [postId]: '',
        }));
      } else {
        console.error('Error updating post:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Rest of the code remains the same

  return (
    <div className="my-posts">
      <h2>Your Posts</h2>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <h3>
              {editMode[post.id] ? (
                <input
                  type="text"
                  value={updatedTitle[post.id] || post.title}
                  onChange={(e) =>
                    setUpdatedTitle((prevTitles) => ({
                      ...prevTitles,
                      [post.id]: e.target.value,
                    }))
                  }
                />
              ) : (
                post.title
              )}
            </h3>
            <p>
              {editMode[post.id] ? (
                <textarea
                  value={updatedContent[post.id] || post.content}
                  onChange={(e) =>
                    setUpdatedContent((prevContents) => ({
                      ...prevContents,
                      [post.id]: e.target.value,
                    }))
                  }
                />
              ) : (
                post.content
              )}
            </p>
            {editMode[post.id] ? (
              <button onClick={() => handleUpdate(post.id)}>Save</button>
            ) : (
              <>
                <button onClick={() => toggleEditMode(post.id)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;

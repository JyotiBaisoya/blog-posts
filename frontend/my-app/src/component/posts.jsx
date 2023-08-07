import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import "../css/posts.css";
import { Link } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [commentInputs, setCommentInputs] = useState({}); // To store comment inputs for each post
    const [showComments, setShowComments] = useState({}); // To store comment visibility for each post

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4500/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const toggleCommentInput = (postId) => {
        setCommentInputs((prevInputs) => ({
            ...prevInputs,
            [postId]: !prevInputs[postId],
        }));
    };

    const toggleComments = (postId) => {
        setShowComments((prevComments) => ({
            ...prevComments,
            [postId]: !prevComments[postId],
        }));
    };

    const handleCommentSubmit = async (postId) => {
        const inputElement = document.getElementById(`comment-input-${postId}`);
        const text = inputElement.value;

        try {
            const response = await fetch(`http://127.0.0.1:4500/${postId}/comments/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                // Refresh the posts to update comments
                fetchPosts();
                inputElement.value = ''; // Clear the input
                toggleCommentInput(postId); // Close the comment input
                
            } else {
                console.error('Error creating comment:', response.statusText);
                Swal.fire("To make comment, Please login first!")
            }
        } catch (error) {
            console.error('Error creating comment:', error);
            Swal.fire("To make comment, Please login first!")
        }
    };

    return (
        <div className="posts">
            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        {/* <p>{post.content}</p> */}
                        <p>{post.content.substring(0, 100)}...</p>
                        <Link to={`/post/${post.id}`}>Read More</Link>
                        {showComments[post.id] ? (
                            <div>
                                <button onClick={() => toggleComments(post.id)}>Hide Comments</button>
                                <ul>
                                    {post.Comments.map((comment) => (
                                        <li key={comment.id}>
                                            <p>{comment.text}</p>
                                            <p>Comment by: {comment.User.username}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <button className="btn-comment" onClick={() => toggleComments(post.id)}>
                                View Comments ({post.Comments.length})
                            </button>
                        )}
                        {commentInputs[post.id] ? (
                            <li className="commenting" key={post.id}>
                                <input type="text" id={`comment-input-${post.id}`} placeholder="Enter your comment" />
                                <button className="send-button" onClick={() => handleCommentSubmit(post.id)}>Send</button>
                            </li>
                        ) : (
                            <button className="btn-comment" onClick={() => toggleCommentInput(post.id)}>
                                Comment
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;


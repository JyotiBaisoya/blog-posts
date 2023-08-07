import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../css/full-posts.css"

const FullPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [commentInputs, setCommentInputs] = useState({});
    const [showComments, setShowComments] = useState({});

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:4500/posts/${id}`);
            const data = await response.json();
            setPost(data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const toggleCommentInput = () => {
        setCommentInputs((prevInputs) => ({
            ...prevInputs,
            [id]: !prevInputs[id],
        }));
    };

    const toggleComments = () => {
        setShowComments((prevComments) => ({
            ...prevComments,
            [id]: !prevComments[id],
        }));
    };

    const handleCommentSubmit = async () => {
        const inputElement = document.getElementById(`comment-input-${id}`);
        const text = inputElement.value;

        try {
            const response = await fetch(`http://127.0.0.1:4500/${id}/comments/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                // Refresh the post to update comments
                fetchPost();
                inputElement.value = ''; // Clear the input
                toggleCommentInput(); // Close the comment input
            } else {
                console.error('Error creating comment:', response.statusText);
                Swal.fire("To make a comment, please login first!");
            }
        } catch (error) {
            console.error('Error creating comment:', error);
            Swal.fire("To make a comment, please login first!");
        }
    };

    return (
        <div className="full-post">
            {post ? (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    {showComments[id] ? (
                        <div>
                            <button onClick={toggleComments}>Hide Comments</button>
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
                        <button className="btn-comment" onClick={toggleComments}>
                            View Comments ({post.Comments.length})
                        </button>
                    )}
                    {commentInputs[id] ? (
                        <div className="commenting">
                            <input type="text" id={`comment-input-${id}`} placeholder="Enter your comment" />
                            <button className="send-button" onClick={handleCommentSubmit}>Send</button>
                        </div>
                    ) : (
                        <button className="btn-comment" onClick={toggleCommentInput}>
                            Comment
                        </button>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default FullPost;


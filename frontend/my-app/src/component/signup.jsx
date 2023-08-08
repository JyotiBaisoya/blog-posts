import React, { useState } from 'react';
import '../css/signup.css';
import Swal from 'sweetalert2';


const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',

    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password } = formData;
        if (!password) {
            Swal.fire('provide the password');
        } else {
            try {
                const response = await fetch('http://16.171.227.86:4500/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    Swal.fire('Signed up successfully');
                    window.location.href = "/login"
                } else {
                    Swal.fire('Something went wrong');
                }
            } catch (error) {
                console.log(error);
                Swal.fire('Something went wrong', error);
            }
        }
    };

    return (
        <div>
            {/* <Nav/> */}
            <div className="container">
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit} id="signup-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Your name"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <button type="submit" className="btn">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

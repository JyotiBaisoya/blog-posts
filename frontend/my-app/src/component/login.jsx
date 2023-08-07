import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../css/login.css';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const req = await fetch('http://127.0.0.1:4500/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (req.ok) {
                const data = await req.json();
                console.log(data.user.username);
                localStorage.setItem("name", data.user.username);
                localStorage.setItem("token", data.token)
                Swal.fire('Logged in successfully');

                window.location.href = "/"
            } else {
                Swal.fire('Wrong password');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Something went wrong', error);
        }
    };

    return (
        <div>
            {/* <Nav/> */}
            <div className="container">
                <h2>Login to Account</h2>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

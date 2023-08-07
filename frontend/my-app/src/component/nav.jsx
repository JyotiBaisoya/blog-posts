// import React from 'react';
// import { Link } from 'react-router-dom';
// import "../css/navbar.css"

// const NavBar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <Link className="navbar-brand" to="/">My Blog App</Link>
//       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link className="nav-link" to="/posts">Posts</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/create-post">Create Post</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/login">Login</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/signup">Sign Up</Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import "../css/navbar.css"
import { useState } from 'react';

const NavBar = () => {
    const [name, setName] = useState(localStorage.getItem('name'));

    function handleLogout() {
        localStorage.removeItem("name")
        localStorage.removeItem("token")
        window.location.href = "/"
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">My Blog App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/posts">Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/create-post">Create Post</Link>
                    </li>
                    {
                        !name && <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    }
                    {
                        !name && <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                    }
                    {
                        name && <li className="nav-item">
                            <Link className="nav-link" to="/profile">{name}</Link>
                        </li>
                    }
                    {
                        name && <li className="nav-item">
                            <Link className="nav-link" to="/my-posts">Your Posts</Link>
                        </li>
                    }
                    {
                        name && <li className="nav-item">
                            <button onClick={() => {
                                handleLogout()
                            }}>Log Out</button>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;



# Blogging Platform

This is a Blogging Platform web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to create, view, edit, and delete blog posts, add comments to posts, and perform other related actions.

## Features

- User Authentication: Users can sign up, log in, and log out using their credentials. Authentication is managed using JWT (JSON Web Tokens) for secure user sessions.

- Home Page: The home page displays a list of blog posts with limited content. Users can click on a "Read More" button to view the complete content of each post.

- Create Posts: Authenticated users can create new blog posts by providing a title and content. Posts are saved to the database and can be viewed by other users.

- Edit and Delete Posts: Users can edit and delete their own posts. Edit mode allows users to update the title and content of a post.

- Add Comments: Users can add comments to blog posts. Comments include the user's username and the comment text.

- My Posts: Authenticated users can view a list of their own posts. They can also edit or delete their posts from this section.

## Installation and Setup

1. Clone the repository:
   git clone https://github.com/JyotiBaisoya/blog-posts.git
   cd blog-posts

2. Install dependencies:
   cd frontend
   npm install
   cd ../backend
   npm install


3. Run the application:
- In the `frontend` directory, run: `npm start`
- In the `backend` directory, run: `node index.js`

5. Open your browser and navigate to: `http://localhost:3000`

## Technologies Used

- Frontend: React.js, React Router,  SweetAlert2
- Backend: Express.js, Node.js, Sequelize (ORM), MySQL (Database)
- Authentication: JSON Web Tokens (JWT)

## Future Enhancements

- User profiles: Allow users to upload avatars and update their profile information.
- Like and share functionality: Implement like and share features for blog posts.
- Pagination: Add pagination to handle large numbers of posts.
- Responsive Design: Make the application responsive for mobile devices.

## Contributors

- Jyoti Baisoya





# 🎟️ Event Management Platform — Backend

A lightweight and scalable Event Management Backend built using Node.js, Express, and MongoDB (Mongoose).
This backend powers a simple event platform where users can:

Create and manage events
Register for approved events
Filter events by date or location
Cancel their registrations
Admins can approve or reject events before they go public.

🚀 Features
👤 Authentication & Authorization
User registration and login with JWT
Role-based access: User and Admin
Secure password hashing with bcrypt

📅 Event Management
Create, update, and delete events
Events include: title, description, date, time, location, capacity
Only approved events are visible to all users
Admins can approve or reject events


📝 Event Registrations
Users can register for approved events
Auto-checks capacity before registering
Users can cancel their registration anytime


🔍 Filters & Queries
Filter events by date
Filter events by location


🧱 Clean Architecture
Modular controllers, routes, and models
RESTful API structure
Easy to integrate with any frontend (HTML/JS or React)


🛠️ Tech Stack
Node.js
Express.js
MongoDB + Mongoose

JWT Authentication
CORS
Nodemon (dev)

⚙️ Installation & Setup
1️⃣ Install dependencies
npm install

2️⃣ Create a .env file in the root:
PORT=5000
MONGO_URI=mongodb_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development

3️⃣ Run the server
npm run dev

4️⃣ Server will start at:

http://localhost:5000

🧪 API Endpoints (Summary)
🔐 Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login & get JWT
GET	/api/auth/me	Get logged-in user
📅 Events
Method	Endpoint	Description
GET	/api/events	Get approved events
GET	/api/events/:id	Get single event
POST	/api/events	Create event (user only)
PUT	/api/events/:id	Update event (owner only)
DELETE	/api/events/:id	Delete event (owner only)
🛡️ Admin Only
Method	Endpoint	Description
GET	/api/events/admin/pending	View pending events
PUT	/api/events/:id/approve	Approve event
PUT	/api/events/:id/reject	Reject event
📝 Registrations
Method	Endpoint	Description
POST	/api/registrations/register	Register for event
POST	/api/registrations/cancel	Cancel registration

💡 Notes
Passwords are always hashed using bcrypt.
Only approved events are visible publicly.
Registration automatically prevents overbooking an event.
This backend is fully compatible with the included frontend (HTML + JS).

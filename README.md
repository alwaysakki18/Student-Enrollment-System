# 🎓 Student Course Enrollment System

A comprehensive **full-stack web application** for managing student course enrollments, built with **React.js (frontend)**, **Node.js/Express (backend)**, and **SQLite (database)**.

---

## 🚀 Features

- **Complete CRUD Operations**  
  Manage students, courses, and enrollments with Create, Read, Update, and Delete functionality.

- **Responsive UI**  
  Mobile-friendly interface with modern design principles.

- **Form Validation**  
  Includes validation for emails, duplicate entries, and required fields.

- **Filtering System**  
  Filter enrollments by specific courses for quick insights.

- **Developer Portfolio Section**  
  About page with developer details and social links.

- **Relational Database**  
  SQLite with properly designed schema and foreign key relationships.

---

## 🛠️ Tech Stack

### Frontend
- React.js (Hooks & Component Architecture)
- Custom CSS (Responsive Styling)

### Backend
- Node.js
- Express.js

### Database
- SQLite (Lightweight & Relational)

---

![Alt Text](path/to/image.png)


---
# Clone the Repository
git clone https://github.com/alwaysakki18/Student-Enrollment-System.git
cd Student-Enrollment-System

---
# Setup Backend
cd backend
npm install
node server.js
Backend runs by default on: http://localhost:5000

---
# Setup Frontend
cd ../frontend
npm install
npm start
Frontend runs by default on: http://localhost:3000

---
# 👨‍💻 Developer

Akshay Pimpale
📌 AI & Data Science Enthusiast | Full-Stack Developer
🔗 GitHub
 | Portfolio
 | LinkedIn

---

## 📂 Project Structure

```bash
student-course-enrollment/
├── backend/
│   ├── package.json        # Backend dependencies
│   ├── server.js           # Express server
│   ├── database.db         # SQLite database file
│   └── requirements.txt    # Backend setup requirements
├── frontend/
│   ├── public/             # Static assets
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── StudentForm.js
│   │   │   ├── CourseForm.js
│   │   │   ├── EnrollmentForm.js
│   │   │   ├── StudentList.js
│   │   │   ├── CourseList.js
│   │   │   ├── EnrollmentList.js
│   │   │   ├── About.js
│   │   │   └── Footer.js
│   │   ├── services/       # API integration
│   │   │   └── api.js
│   │   ├── styles/         # CSS styling for each component
│   │   ├── App.js          # Main React app
│   │   ├── index.js        # Entry point
│   │   └── index.css
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Frontend-specific documentation
├── .gitignore
└── README.md               # Root project documentation




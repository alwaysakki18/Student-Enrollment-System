const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Create tables if they don't exist
db.serialize(() => {
  // Students table
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Courses table
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_name TEXT NOT NULL UNIQUE,
    duration INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Enrollments table with foreign keys
  db.run(`CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    course_id INTEGER,
    enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE(student_id, course_id)
  )`);
});

// Enable foreign key constraints
db.run('PRAGMA foreign_keys = ON');

// Student routes
app.get('/api/students', (req, res) => {
  db.all('SELECT * FROM students ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/students/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json(row);
  });
});

app.post('/api/students', (req, res) => {
  const { name, email } = req.body;
  
  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  db.run('INSERT INTO students (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, name, email });
  });
});

app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  db.run(
    'UPDATE students SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [name, email, id],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Student not found' });
        return;
      }
      res.json({ id: parseInt(id), name, email });
    }
  );
});

app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json({ message: 'Student deleted successfully' });
  });
});

// Course routes
app.get('/api/courses', (req, res) => {
  db.all('SELECT * FROM courses ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM courses WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(row);
  });
});

app.post('/api/courses', (req, res) => {
  const { course_name, duration } = req.body;
  
  if (!course_name || !duration) {
    return res.status(400).json({ error: 'Course name and duration are required' });
  }
  
  db.run('INSERT INTO courses (course_name, duration) VALUES (?, ?)', [course_name, duration], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Course already exists' });
      }
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, course_name, duration });
  });
});

app.put('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  const { course_name, duration } = req.body;
  
  if (!course_name || !duration) {
    return res.status(400).json({ error: 'Course name and duration are required' });
  }
  
  db.run(
    'UPDATE courses SET course_name = ?, duration = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [course_name, duration, id],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Course already exists' });
        }
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Course not found' });
        return;
      }
      res.json({ id: parseInt(id), course_name, duration });
    }
  );
});

app.delete('/api/courses/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM courses WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json({ message: 'Course deleted successfully' });
  });
});

// Enrollment routes
app.get('/api/enrollments', (req, res) => {
  let query = `
    SELECT e.id, s.id as student_id, s.name as student_name, s.email, 
           c.id as course_id, c.course_name, c.duration, e.enrollment_date
    FROM enrollments e
    JOIN students s ON e.student_id = s.id
    JOIN courses c ON e.course_id = c.id
  `;
  
  const params = [];
  
  if (req.query.course_id) {
    query += ' WHERE c.id = ?';
    params.push(req.query.course_id);
  }
  
  query += ' ORDER BY e.enrollment_date DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/enrollments', (req, res) => {
  const { student_id, course_id } = req.body;
  
  if (!student_id || !course_id) {
    return res.status(400).json({ error: 'Student ID and Course ID are required' });
  }
  
  db.run('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [student_id, course_id], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Student is already enrolled in this course' });
      }
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, student_id, course_id });
  });
});

app.delete('/api/enrollments/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM enrollments WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Enrollment not found' });
      return;
    }
    res.json({ message: 'Enrollment deleted successfully' });
  });
});

// About info endpoint
app.get('/api/about', (req, res) => {
  res.json({
    developer: {
      name: "Akshay Pimpale",
      address: "Nashik, Maharashtra, India",
      education: "Bachelor of Engineering in Artificial Intelligence and Data Science",
      photo: "D:\Student Enrollment System\Akshay Photograph.jpeg",
      social: {
        linkedin: "https://linkedin.com/in/akshaypimpale",
        github: "https://github.com/akshaypimpale",
        instagram: "https://instagram.com/akshaypimpale",
        twitter: "https://twitter.com/akshaypimpale",
        email: "mailto:akshay.pimpale@example.com"
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
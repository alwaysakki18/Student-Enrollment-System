import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import CourseForm from './components/CourseForm';
import EnrollmentForm from './components/EnrollmentForm';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';
import EnrollmentList from './components/EnrollmentList';
import About from './components/About';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('enrollments');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [filterCourse, setFilterCourse] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [aboutInfo, setAboutInfo] = useState(null);

  // Fetch data
  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchEnrollments();
    fetchAboutInfo();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      let url = '/api/enrollments';
      if (filterCourse) {
        url += `?course_id=${filterCourse}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const fetchAboutInfo = async () => {
    try {
      const response = await fetch('/api/about');
      const data = await response.json();
      setAboutInfo(data.developer);
    } catch (error) {
      console.error('Error fetching about info:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterCourse(e.target.value);
    setTimeout(fetchEnrollments, 100);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Student Course Enrollment System</h1>
        <nav>
          <button 
            className={activeTab === 'enrollments' ? 'active' : ''} 
            onClick={() => setActiveTab('enrollments')}
          >
            View Enrollments
          </button>
          <button 
            className={activeTab === 'students' ? 'active' : ''} 
            onClick={() => setActiveTab('students')}
          >
            Manage Students
          </button>
          <button 
            className={activeTab === 'addStudent' ? 'active' : ''} 
            onClick={() => {
              setEditingStudent(null);
              setActiveTab('addStudent');
            }}
          >
            {editingStudent ? 'Edit Student' : 'Add Student'}
          </button>
          <button 
            className={activeTab === 'courses' ? 'active' : ''} 
            onClick={() => setActiveTab('courses')}
          >
            Manage Courses
          </button>
          <button 
            className={activeTab === 'addCourse' ? 'active' : ''} 
            onClick={() => {
              setEditingCourse(null);
              setActiveTab('addCourse');
            }}
          >
            {editingCourse ? 'Edit Course' : 'Add Course'}
          </button>
          <button 
            className={activeTab === 'enroll' ? 'active' : ''} 
            onClick={() => setActiveTab('enroll')}
          >
            Enroll Student
          </button>
          <button 
            className={activeTab === 'about' ? 'active' : ''} 
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'enrollments' && (
          <EnrollmentList 
            enrollments={enrollments} 
            courses={courses}
            filterCourse={filterCourse}
            onFilterChange={handleFilterChange}
            onDeleteEnrollment={fetchEnrollments}
          />
        )}

        {activeTab === 'students' && (
          <StudentList 
            students={students}
            onEditStudent={(student) => {
              setEditingStudent(student);
              setActiveTab('addStudent');
            }}
            onDeleteStudent={fetchStudents}
          />
        )}

        {activeTab === 'addStudent' && (
          <StudentForm 
            student={editingStudent}
            onSave={fetchStudents}
            onCancel={() => {
              setEditingStudent(null);
              setActiveTab('students');
            }}
          />
        )}

        {activeTab === 'courses' && (
          <CourseList 
            courses={courses}
            onEditCourse={(course) => {
              setEditingCourse(course);
              setActiveTab('addCourse');
            }}
            onDeleteCourse={fetchCourses}
          />
        )}

        {activeTab === 'addCourse' && (
          <CourseForm 
            course={editingCourse}
            onSave={fetchCourses}
            onCancel={() => {
              setEditingCourse(null);
              setActiveTab('courses');
            }}
          />
        )}

        {activeTab === 'enroll' && (
          <EnrollmentForm 
            students={students}
            courses={courses}
            onSave={fetchEnrollments}
          />
        )}

        {activeTab === 'about' && aboutInfo && (
          <About developer={aboutInfo} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
import React from 'react';
import '../styles/CourseList.css';

const CourseList = ({ courses, onEditCourse, onDeleteCourse }) => {
  const deleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`/api/courses/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          onDeleteCourse();
          alert('Course deleted successfully!');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  return (
    <div className="tab-content">
      <h2>Manage Courses</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Duration (weeks)</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.course_name}</td>
                <td>{course.duration}</td>
                <td>{new Date(course.created_at).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn-primary"
                    onClick={() => onEditCourse(course)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 && <p>No courses found.</p>}
      </div>
    </div>
  );
};

export default CourseList;
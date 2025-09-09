import React from 'react';
import '../styles/EnrollmentList.css';

const EnrollmentList = ({ enrollments, courses, filterCourse, onFilterChange, onDeleteEnrollment }) => {
  const deleteEnrollment = async (id) => {
    if (window.confirm('Are you sure you want to delete this enrollment?')) {
      try {
        const response = await fetch(`/api/enrollments/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          onDeleteEnrollment();
          alert('Enrollment deleted successfully!');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error deleting enrollment:', error);
      }
    }
  };

  return (
    <div className="tab-content">
      <h2>Enrollment Records</h2>
      <div className="filter-section">
        <label>
          Filter by Course:
          <select 
            value={filterCourse} 
            onChange={onFilterChange}
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Duration (weeks)</th>
              <th>Enrollment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td>{enrollment.student_name}</td>
                <td>{enrollment.email}</td>
                <td>{enrollment.course_name}</td>
                <td>{enrollment.duration}</td>
                <td>{new Date(enrollment.enrollment_date).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn-danger"
                    onClick={() => deleteEnrollment(enrollment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {enrollments.length === 0 && <p>No enrollments found.</p>}
      </div>
    </div>
  );
};

export default EnrollmentList;
import React from 'react';
import '../styles/StudentList.css';

const StudentList = ({ students, onEditStudent, onDeleteStudent }) => {
  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          onDeleteStudent();
          alert('Student deleted successfully!');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <div className="tab-content">
      <h2>Manage Students</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{new Date(student.created_at).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn-primary"
                    onClick={() => onEditStudent(student)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && <p>No students found.</p>}
      </div>
    </div>
  );
};

export default StudentList;
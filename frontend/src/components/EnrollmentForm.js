import React, { useState } from 'react';
import '../styles/EnrollmentForm.css';

const EnrollmentForm = ({ students, courses, onSave }) => {
  const [formData, setFormData] = useState({
    student_id: '',
    course_id: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.student_id) {
      newErrors.student_id = 'Please select a student';
    }
    
    if (!formData.course_id) {
      newErrors.course_id = 'Please select a course';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormData({ student_id: '', course_id: '' });
        onSave();
        alert('Student enrolled successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating enrollment:', error);
    }
  };

  return (
    <div className="tab-content">
      <h2>Enroll Student in Course</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Student:</label>
          <select
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className={errors.student_id ? 'error' : ''}
          >
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
          {errors.student_id && <span className="error-text">{errors.student_id}</span>}
        </div>
        <div className="form-group">
          <label>Course:</label>
          <select
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className={errors.course_id ? 'error' : ''}
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.course_name} ({course.duration} weeks)
              </option>
            ))}
          </select>
          {errors.course_id && <span className="error-text">{errors.course_id}</span>}
        </div>
        <button type="submit">Enroll Student</button>
      </form>
    </div>
  );
};

export default EnrollmentForm;
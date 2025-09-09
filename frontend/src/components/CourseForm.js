import React, { useState, useEffect } from 'react';
import '../styles/CourseForm.css';

const CourseForm = ({ course, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    course_name: '',
    duration: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (course) {
      setFormData({
        course_name: course.course_name,
        duration: course.duration
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.course_name.trim()) {
      newErrors.course_name = 'Course name is required';
    }
    
    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Duration must be a positive number';
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
      const url = course 
        ? `/api/courses/${course.id}`
        : '/api/courses';
      
      const method = course ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        onSave();
        alert(course ? 'Course updated successfully!' : 'Course added successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  return (
    <div className="tab-content">
      <h2>{course ? 'Edit Course' : 'Add New Course'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            className={errors.course_name ? 'error' : ''}
          />
          {errors.course_name && <span className="error-text">{errors.course_name}</span>}
        </div>
        <div className="form-group">
          <label>Duration (weeks):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            className={errors.duration ? 'error' : ''}
          />
          {errors.duration && <span className="error-text">{errors.duration}</span>}
        </div>
        <div className="form-actions">
          <button type="submit">{course ? 'Update Course' : 'Add Course'}</button>
          {course && (
            <button 
              type="button"
              className="btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
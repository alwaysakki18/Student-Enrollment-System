// API service functions
export const studentAPI = {
  getAll: () => fetch('/api/students').then(res => res.json()),
  getById: (id) => fetch(`/api/students/${id}`).then(res => res.json()),
  create: (data) => fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  update: (id, data) => fetch(`/api/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  delete: (id) => fetch(`/api/students/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
};

export const courseAPI = {
  getAll: () => fetch('/api/courses').then(res => res.json()),
  getById: (id) => fetch(`/api/courses/${id}`).then(res => res.json()),
  create: (data) => fetch('/api/courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  update: (id, data) => fetch(`/api/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  delete: (id) => fetch(`/api/courses/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
};

export const enrollmentAPI = {
  getAll: (courseId) => {
    const url = courseId ? `/api/enrollments?course_id=${courseId}` : '/api/enrollments';
    return fetch(url).then(res => res.json());
  },
  create: (data) => fetch('/api/enrollments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  delete: (id) => fetch(`/api/enrollments/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
};

export const aboutAPI = {
  getInfo: () => fetch('/api/about').then(res => res.json())
};
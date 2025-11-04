import axios from 'axios';


const BASE_URL = 'http://localhost:3000';
;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const fetchTasks = async ({ status, q } = {}) => {
  const params = {};
  if (status && status !== 'All') params.status = status;
  if (q) params.q = q;
  const res = await api.get('/tasks', { params });
  return res.data;
};

export const createTask = async (title, description) => {
  const res = await api.post('/tasks', { title, description });
  return res.data;
};

export const updateTaskStatus = async (id, status) => {
  const res = await api.patch(`/tasks/${id}`, { status });
  return res.data;
};

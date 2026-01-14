import * as requestUtil from '../utility/requests.js'
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3030";

export const api = {
  getCourses: () => requestUtil.getRequest(`${API_BASE}/courses`),
  getTechnologies: () => requestUtil.getRequest(`${API_BASE}/courses/technologies`),
  getLanguages: () => requestUtil.getRequest(`${API_BASE}/courses/languages`),
  getKeywords: () => requestUtil.getRequest(`${API_BASE}/courses/keywords`),
  addVisitor: () => requestUtil.postRequest(`${API_BASE}/addvisitor`),
};
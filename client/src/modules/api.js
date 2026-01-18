import * as requestUtil from '../utility/requestUtil.js'
const API_BASE =
  import.meta.env.VITE_API_BASE || "https://classfinder-production.up.railway.app";


export const api = {
  getCourses: () => requestUtil.getRequest(`${API_BASE}/courses`),
  getTechnologies: () => requestUtil.getRequest(`${API_BASE}/courses/technologies`),
  getLanguages: () => requestUtil.getRequest(`${API_BASE}/courses/languages`),
  getKeywords: () => requestUtil.getRequest(`${API_BASE}/courses/keywords`),
  getCategories: () => requestUtil.getRequest(`${API_BASE}/courses/categories`),
  addVisitor: () => requestUtil.postRequest(`${API_BASE}/addvisitor`)
};
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header'
import Introduction from './Introduction'
import CourseList from './CourseList';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Introduction></Introduction>
    <CourseList></CourseList>
  </React.StrictMode>
);


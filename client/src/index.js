import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Header from './components/Header'
import Introduction from './components/Introduction'
import CourseList from './components/CourseList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Introduction></Introduction>
    <CourseList></CourseList>
  </React.StrictMode>
);


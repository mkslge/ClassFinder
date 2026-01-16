import React from "react"
import CourseList from '../components/CourseList'
import Introduction from "../components/Introduction"
function Home() {
    return (
    <React.StrictMode>
    

    <Introduction></Introduction>
    <CourseList></CourseList>
    </React.StrictMode>
    )
}

export default Home;
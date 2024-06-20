import React,{useState, useEffect} from 'react';
import Course from '../../../model/CourseIntern'
import fetchCoursesForIntern from '../../../apis/InternApis/CourseIntern';
import {Link} from "react-router-dom";
import '../../../css/InternDashboard/NavbarIntern.css'
interface DropDownCoursesProps{
    internId : string;
}
const DropDownCourses:React.FC<DropDownCoursesProps> = ({internId}) =>{
    const [Courses, setCourses] = useState<Course[]>([])
    useEffect(
        ()=>{
            const fetchData = async ()=>{
                try{
                    const data = await fetchCoursesForIntern(internId);
                    setCourses(data);
                }catch(error){
                    console.log("Found an error at DropDownCourses", error);
                }
            }
            fetchData();
        }
        ,[])
    return(
        <div className="NavbarDropDown">
            {
                Courses.map(courseIntern =>(
                    <Link to={`/intern/course/${courseIntern.course_id}`}>{courseIntern.course_description}</Link>
                ))
            }
        </div>
    )
}
export default DropDownCourses;
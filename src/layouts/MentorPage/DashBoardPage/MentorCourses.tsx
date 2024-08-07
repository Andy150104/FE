import React, {useState, useEffect } from 'react';
import CourseMentor from "../../../model/Mentor/CourseMentor";
import fetchCourseMentor from "../../../apis/MentorApis/CourseMentor";
import MentorCourseCard from "./MentorCourseCard";

interface MentorCoursesProps{
    mentorId : string;
}
const MentorCourses: React.FC<MentorCoursesProps> = ({mentorId}) => {
    const [courses, setCourses] = useState<CourseMentor[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                 const data = await fetchCourseMentor(mentorId);
                 setCourses(data);
            }catch(error){
                console.log("MentorCourses: found and error while fetching ", error);
            }
        }
        fetchData();
    }
    ,[]);
    const showMoreCourses = () => {
        setVisibleCount(prevCount => prevCount + 6); // Increment the count by 5 each time
    };
    if (courses.length>0){
        return(
            <div>
                {courses.slice(0, visibleCount).map(courseMentor => (
                    <MentorCourseCard
                        key={courseMentor.course_id}
                        mentorId={courseMentor.mentor_id}
                        courseId={courseMentor.course_id}
                        courseName={courseMentor.course_name}
                        mentorName={courseMentor.mentorName}
                    />
                ))}
                {visibleCount < courses.length && (
                    <p style={{color:"blue", cursor:"pointer",
                        fontWeight:"bold", marginLeft:"1rem", fontSize:"large"}} onClick={showMoreCourses}>Show More</p>
                )}
            </div>
        )
    }
    else return (
        <div>
            <p style={{fontSize: "1.5rem", marginLeft: "2rem", color: "black", fontWeight: "bold"}}>
                No available courses.</p>
        </div>
    )
}
export default MentorCourses;
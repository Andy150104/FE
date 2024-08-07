import React, {useState, useEffect } from 'react';
import CourseMentor from "../../../../model/Mentor/CourseMentor";
import fetchCourseMentor from "../../../../apis/MentorApis/CourseMentor";
import MentorFeedbackCourseCard from "./MentorFeedbackCourseCard";

interface MentorCoursesProps{
    mentorId : string;
}
const MentorFeedbackCourses: React.FC<MentorCoursesProps> = ({mentorId}) => {
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
    return(
        <div>
            {courses.slice(0, visibleCount).map(courseMentor => (
                <MentorFeedbackCourseCard
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
export default MentorFeedbackCourses;
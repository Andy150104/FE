import axios from "axios";
import CourseMentor from "../../model/Mentor/CourseMentor";
const fetchCourseMentor = async (mentorId: string) => {
    try{
        const response = await axios.get(`http://localhost:8080/internbridge/mentor/course/${mentorId}?pageNo=0&pageSize=999`)
        return response.data.courses.map( (courseMentor: any) => new CourseMentor(
            courseMentor.courseId,
            courseMentor.courseName,
            courseMentor.companyId,
            courseMentor.companyName,
            courseMentor.mentorId,
            courseMentor.mentorName,
            new Date(courseMentor.startDate),
            new Date(courseMentor.endDate),
            courseMentor.status,
        ) )
    }catch(error){
        console.log("fetchCourseMentor: found an error. ",error);
    }
}
export default fetchCourseMentor
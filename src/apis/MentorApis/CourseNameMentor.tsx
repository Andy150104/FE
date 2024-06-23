import axios from "axios";


const fetchCourseNameMentor = async (courseId:string,mentorId:string) => {
    try {
        console.log("fetchCourseNameMentor called");
        console.log("courseId:",courseId);
        console.log("mentorId:",mentorId);
        const response = await axios.get(`http://localhost:8080/internbridge/mentor/course/name/${mentorId}&${courseId}`)
        console.log(response.data);
        return response.data.courseName;
    }catch(error){
        console.log("Found an error while fetching course name ", error);
    }
}
export default fetchCourseNameMentor;
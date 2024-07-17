import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useToast} from "../../../context/ToastContext";
import CourseVerify from "../../../apis/InternApis/CourseVerify";
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import NavbarIntern from "../NavbarIntern/NavbarIntern";
import {Footer} from "../../HeaderAndFooter/Footer";
import CourseName from "../CourseActivityPage/CourseName";
import SendCourseFeedback from "../../../apis/InternApis/SendCourseFeedback";
import CourseFeedbackVerify from "../../../apis/InternApis/CourseFeedbackVerify";
import "../../../css/Intern/SendFeedbackPage.css"
import Cookies from "js-cookie";
const CourseFeedbackPage:React.FC = () =>{
    const {courseId} = useParams();
    const checkedCourseId = courseId ?? "";

    const [user, setUser] = useState<{ user_id: number } | null>(null);

    //-------- Check User ---------
    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const StringInternId = user?.user_id.toString();
    const checkedInternId = StringInternId ?? "";

    //useToast
    const { showToast } = useToast();
    //----verify if intern is in that course
    const navigate = useNavigate();
    const [isInCourse, setIsInCourse] = useState<boolean>(true);

    const verifyInternCourse = async ()=>{
        try{
            const courseVerifyData = await CourseVerify(checkedInternId,checkedCourseId);
            console.log(courseVerifyData);
            if(courseVerifyData.toString()==="false"){
                setIsInCourse(false);
            }
        }catch(error){
            console.error("CourseActivityPage error: ",error);
        }
    }
    useEffect(()=>{
        if(checkedCourseId&&checkedInternId){
            console.log("checking if intern is in that course...");
            verifyInternCourse();
        }
    },[checkedCourseId,checkedInternId])

    useEffect(()=>{
        if(!isInCourse){
            showToast("You are not/no longer in this course!","error");
            navigate("/intern");
        }
    },[isInCourse])

    //verify if intern has Not send feedback to the course already
    const [feedbackStatus, setFeedbackStatus] = useState<boolean>()
    const verifyFeedbackStatus = async() =>
    {
        try{
            const feedbackStatusVerify = await CourseFeedbackVerify(checkedInternId,checkedCourseId);
            console.log("feedback status verify result: ",feedbackStatusVerify);
            if(feedbackStatusVerify.toString()==="true"){
                setFeedbackStatus(true);
            }
        }catch(error){
            console.error("CourseActivityPage error: ",error);
        }
    }

    useEffect(()=>{
        if(checkedCourseId&&checkedInternId){
            console.log("checking if intern has already sent feedback or not...");
            verifyFeedbackStatus();
        }
    },[checkedCourseId,checkedInternId])

    useEffect(()=>{
        if(feedbackStatus){
            showToast("You have already sent feedback to this course!","error");
            navigate("/intern");
        }
    },[feedbackStatus])

    //-------FEEDBACK---------//
    const [cooldown,setCooldown] = useState(false);

    const [feedbackContent, setFeedbackContent] = useState<string>("");
    const handleSendFeedback = ()=>{
        if(cooldown){
            showToast("You've already sent feedback to this course!","error");
        }
        else if(feedbackContent==="") {
            showToast("Feedback Content must not be empty!", 'warn');
        }
        else{
            try{
                SendCourseFeedback(checkedInternId,checkedCourseId,feedbackContent).then(
                    ()=>{
                        showToast("Feedback sent successfully", "success");
                        navigate("/intern");
                    }
                );

                setCooldown(true);
                setTimeout(()=>{
                    setCooldown(false);
                }, 10000)
            }catch(error){
                console.log("CourseFeedbackPage/handleSendFeedback error: ",error);
            }

        }
    }

    if (!user || !checkedCourseId || !checkedInternId) {
        return <p>Loading...</p>;
    }
    return(
        <>
            <div>
                <HeaderWorkplace/>
            </div>
            <div>
                <NavbarIntern internId={checkedInternId} selectedPage={"Feedback"}/>
            </div>

            <div className="intern-course-feedback">
                <div className="feedback-container">
                    <h2 style={{display: "inline-block"}}>Sending feedback to course:</h2> <CourseName
                    courseId={checkedCourseId} internId={checkedInternId}/>
                    <textarea
                        className="feedback-input"
                        value={feedbackContent}
                        onChange={(e) => {
                            setFeedbackContent(e.target.value);
                        }}
                        placeholder="Enter feedback content here."
                    />
                    <button onClick={handleSendFeedback}>Send feedback</button>
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </>
    )
}
export default CourseFeedbackPage
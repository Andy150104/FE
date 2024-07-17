import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {HeaderWorkplace} from "../../../HeaderAndFooter/HeaderWorkplace";
import {NavbarCoordinator} from "../../../HeaderAndFooter/Navbar/NavbarCoordinator";
import {Footer} from "../../../HeaderAndFooter/Footer";
import fetchCourseFeedbackContent from "../../../../apis/CoordinatorApis/GetCourseFeedback";
import CourseFeedbackContent from "../../../../model/Coordinator/CourseFeedbackContent";
import Cookies from "js-cookie";

const ViewCourseFeedbackPage = ()=>{
    //get course id
    const {courseId} = useParams()
    const checkedCourseId = courseId ? courseId : ""; //prevents from being undefined

    // check user---------------
    const [user, setUser] = useState<{ user_id: number } | null>(null);

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const StringCoordinatorId = user?.user_id.toString(); // Convert to string
    const checkedCoordinatorId = StringCoordinatorId ?? ""; // prevent from being unidentified

    //Fetch Course Feedbacks from Interns
    const [feedbacks, setFeedbacks]
        = useState<CourseFeedbackContent[]>([])
    useEffect(()=>{
        if(checkedCoordinatorId && checkedCourseId){
            try{
                const fetchData = async ()=>{
                    const data = await fetchCourseFeedbackContent(checkedCourseId, checkedCoordinatorId);
                    setFeedbacks(data);
                }
                fetchData();
            }catch(error){
                console.log("error while fetching course feedbacks: ",error);
            }
        }
    },[checkedCoordinatorId,checkedCourseId])
    console.log("courseId:", checkedCourseId);
    //  PAGINATION
    const maxMessages = 10;
    const [pageAmount, setPageAmount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePaginationClick = (event:string) => {
        if (event==="toLeft"){
            if((currentPage-1)>0){
                setCurrentPage(currentPage - 1);
            }
        }
        else if (event==="toRight"){
            if((currentPage+1)<pageAmount+1){
                setCurrentPage(currentPage + 1);
            }
        }
        else if (event==="leftMost"){
            setCurrentPage(1);
        }
        else if(event==="rightMost"){
            setCurrentPage(pageAmount);
        }
    }
    useEffect(
        ()=>{
            setPageAmount(Math.ceil(feedbacks.length/maxMessages));
        }
        ,[feedbacks])
    return(
        <>
            <div>
                <HeaderWorkplace/>
            </div>
            <NavbarCoordinator/>
            {feedbacks.length>0 && (
                <div className="feedback-background">
                    <div style={{margin: "1rem 1rem 1rem 3rem"}}>
                        <p className="highlight1">All feedbacks: </p>
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div className="feedback-container">
                            <table>
                                <thead>
                                <tr className="table-header">
                                    <th>Sender</th>
                                    <th>Feedback content</th>
                                </tr>
                                </thead>
                                <tbody>
                                {feedbacks.slice(maxMessages * currentPage - maxMessages, maxMessages * currentPage).map((feedback, index) => (
                                    <tr key={index}>
                                        <td>{feedback.internName}</td>
                                        <td>{feedback.feedbackContent}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="pagination-items">
                                <button onClick={() => handlePaginationClick("leftMost")}
                                        className="pagination-button">&lt;&lt;</button>
                                <button onClick={() => handlePaginationClick("toLeft")}
                                        className="pagination-button">&lt;</button>
                                <p className="pagination-page">{currentPage}/{pageAmount}</p>
                                <button onClick={() => handlePaginationClick("toRight")}
                                        className="pagination-button">&gt;</button>
                                <button onClick={() => handlePaginationClick("rightMost")}
                                        className="pagination-button">&gt;&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {feedbacks.length<=0 && (
                <div className="feedback-background">
                    <div style={{margin: "1rem 1rem 1rem 3rem"}}>
                        <p className="highlight1">
                            No intern has sent feedback to this course yet...
                        </p>
                    </div>
                </div>
            )}

            <Footer/>
        </>
    )
}
export default ViewCourseFeedbackPage;
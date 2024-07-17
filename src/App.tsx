
import "./App.css";
import "./style.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./layouts/HomePage/HomePage";
import LoginPage from "./layouts/LoginPage/LoginPage";
import AuthService from "./service/AuthService";
import { ToastProvider } from "./context/ToastContext";
import { JobpPage } from "./layouts/JobPage/JobPage";
import { JobDetailPage } from "./layouts/JobDetailPage/JobDetailPage";
import { ManagerPage } from "./layouts/ManagerPage/ManagerPage";
import { DashboardPage } from "./layouts/InternPage/DashBoardPage/DashboardPage";
import MentorDashboard from "./layouts/MentorPage/DashBoardPage/MentorDashboard";
import CourseActivityPage from "./layouts/InternPage/CourseActivityPage/CourseActivityPage";
import { PostJobPage } from "./layouts/ManagerPage/PostJobPage";
import { AdminPage } from "./layouts/AdminPage/AdminPage";
import { ErrorPage } from "./layouts/404Page/ErrorPage";
import { ForgotPasswordPage } from "./layouts/ForgotPasswordPage/ForgotPasswordPage";
import { ForgotPasswordPage2 } from "./layouts/ForgotPasswordPage/ForgotPasswordPage2";
import { VerificationForgotPage } from "./layouts/ForgotPasswordPage/VerificationForgotPage";
import { SuccessPage } from "./layouts/SuccessPage/SuccessPage";
import { AdminCreateCompanyPage } from "./layouts/AdminPage/AdminCreateCompanyPage";
import { AdminViewUserInSystem } from "./layouts/AdminPage/AdminViewUserInSystem";

import ShowCourse from "./layouts/ShowCourse/ShowCourse";
import { AdminCreateUser } from "./layouts/AdminPage/AdminCreateUser";
import { ManagerViewJobByCompany } from "./layouts/ManagerPage/ManagerViewJobByCompany";

import { AdminViewAllCompanyPage } from "./layouts/AdminPage/AdminViewAllCompanyPage";
import { MentorViewAllCoursePage } from "./layouts/MentorPage/Page/MentorViewAllCoursePage";
import MentorActivityPage from "./layouts/MentorPage/CourseActivityPage/MentorActivityPage";
import ViewCourseInsystemByCoordinator from "./layouts/CoordinatorCoursePage/CoordinatorCoursePage";
import CreateCourseComponent from "./layouts/CoordinatorCoursePage/CreateCourse/CreateCourseComponent";
import { CoordinatorCreateSchedulePage } from "./layouts/CoordinatorCoursePage/CoordinatorCreateSchedulePage";
import { CoordinatorCreateCoursePage } from "./layouts/CoordinatorCoursePage/CoordinatorCreateCoursePage";
import { MentorCreateActivitiesForCourse } from "./layouts/MentorPage/Page/MentorCreateActivitiesForCourse";
import { MentorViewAllActivitiesInCourse } from "./layouts/MentorPage/Page/MentorViewAllActivitiesInCourse";
import { MentorViewAllResultInCourse } from "./layouts/MentorPage/Page/MentorViewAllResultInCourse";
import { CoordinatorViewBarChart } from "./layouts/CoordinatorCoursePage/CoordinatorViewBarChart";
import { CoordinatorAddInternToCoursePage } from "./layouts/CoordinatorCoursePage/CoordinatorAddInternToCoursePage";
import MentorFeedbackInternPage
  from "./layouts/MentorPage/FeedbackPages/MentorFeedbackInternPage/MentorFeedbackInternPage";
import MentorFeedbackCoursePage
  from "./layouts/MentorPage/FeedbackPages/MentorFeedbackCoursePage/MentorFeedbackCoursePage";
import FeedbackPage from "./layouts/InternPage/FeedbackPages/FeedbackPage";
import CoordinatorFeedbackCoursePage
  from "./layouts/CoordinatorPage/FeedbackPages/CoordinatorFeedbackCoursePage/CoordinatorFeedbackCoursePage";
import CoordinatorFeedbackInternPage
  from "./layouts/CoordinatorPage/FeedbackPages/CoordinatorFeedbackInternPage/CoordinatorFeedbackInternPage";
import { ManagerCreateAccount } from "./layouts/ManagerPage/ManagerCreateAccount";
import MyCalendar from "./layouts/ManagerPage/TimeTable/TimeTable";
import { VerificationEmail } from "./layouts/VerificationEmail/VerificationEmail.";
import ViewProfilePage from "./layouts/HeaderAndFooter/ViewProfilePage";
import { HelpPage } from "./layouts/HelpPage/HelpPage";
import { AdminViewRequest } from "./layouts/AdminPage/RequestAdmin/AdminViewRequest";
import { CertificateJob } from "./layouts/ManagerPage/CertificateJob/CertificateJob";
import { ViewIntern } from "./layouts/ManagerPage/CertificateJob/ViewIntern";
import { ViewInternPage } from "./layouts/ManagerPage/ViewInternPage";
import { ViewEmployeePage } from "./layouts/ManagerPage/ViewEmployeePage";
import { AdminViewRequestPage } from "./layouts/AdminPage/RequestAdmin/AdminViewRequestPage";
import { MyPieChart } from "./layouts/ManagerPage/Chart/PieChartManager";
import { ReportManager } from "./layouts/ManagerPage/Chart/ReportManager";
import { CoordinatorViewSchedulePage } from "./layouts/CoordinatorCoursePage/CoordinatorViewSchedulePage";
import CourseFeedbackPage from "./layouts/InternPage/FeedbackPages/CourseFeedbackPage";
import SelectCourseFeedbackPage
  from "./layouts/CoordinatorPage/FeedbackPages/SelectCourseFeedbackPage/SelectCourseFeedbackPage";
import ViewCourseFeedbackPage
  from "./layouts/CoordinatorPage/FeedbackPages/ViewCourseFeedbackPage/ViewCourseFeedbackPage";
import ProtectedRoute from "./context/ProtectedRoute";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
export const App = () => {
  return (
    <ToastProvider>
      <Router>
       <div className="d-flex flex-column min-vh-100">
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/jobs" element={<JobpPage />} />
              <Route path="/jobs/search=:id" element={<JobpPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/Workplace/Manager" element={<ManagerPage />} />
              <Route path="/Workplace/Manager/postJob" element={<PostJobPage />} />
              <Route path="/Workplace/Manager/viewJob" element={<ManagerViewJobByCompany />} />
              <Route path="/Workplace/Manager/createAccount" element={<ManagerCreateAccount/>}/>
              <Route path="/Workplace/Manager/viewIntern" element={<ViewInternPage/>}/>
              <Route path="/Workplace/Manager/schedule" element={<MyCalendar/>}/>
              <Route path="/Workplace/Manager/viewEmployee" element={<ViewEmployeePage/>}/>
              <Route path="/Workplace/Manager/Report" element={<ReportManager/>}/>
              <Route element={<ProtectedRoute allowedRoles={['ROLE_INTERN']} />}>
                    <Route path="/intern" element={<DashboardPage />} />
                    <Route path="/intern/course/:courseId" element={<CourseActivityPage />} />
                    <Route path="/intern/feedback" element={<FeedbackPage/>} />
                    <Route path="/intern/sendFeedback/:courseId" element={<CourseFeedbackPage/>} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
              <Route path="/Admin" element={<AdminPage />} />
              <Route path="/Admin/CreateCompany" element={<AdminCreateCompanyPage />} />
              <Route path="/Admin/ViewUser" element={<AdminViewUserInSystem />} />
              <Route path="/Admin/viewRequest" element={<AdminViewRequestPage/>} />
              <Route path="Admin/CreateUser" element={<AdminCreateUser />} />
              <Route path="/Admin/ViewAllCompany" element={<AdminViewAllCompanyPage/>}/>
              </Route>
              <Route path="/mentor" element={<MentorDashboard />} />
              <Route path="/mentor/:courseId" element={<MentorActivityPage/>}/>
              <Route path="/mentor/feedback" element={<MentorFeedbackCoursePage/>}/>
              <Route path="/mentor/feedback/:courseId" element={<MentorFeedbackInternPage/>}/>
              <Route path="/coordinator/course/:courseId" element={<ShowCourse />} />
              <Route path="coordinator/createCourse" element={<CoordinatorCreateCoursePage/>} />
              <Route path="verify" element={<ForgotPasswordPage />} />
              <Route path="/forgotPassword" element={<ForgotPasswordPage2 />} />
              <Route path="/verifyPassword" element={<VerificationForgotPage />} />
              <Route path="/mentor/ViewCourse" element={<MentorViewAllCoursePage/>}/>
              <Route path="/mentor/createActivities" element={<MentorCreateActivitiesForCourse/>}/>
              <Route path="/mentor/viewactivities" element={<MentorViewAllActivitiesInCourse/>}/>
              <Route path="/mentor/report" element={<MentorViewAllResultInCourse/>}/>
              <Route path="*" element={<ErrorPage />} />
              <Route path="/s" element={<SuccessPage />} />
              <Route path="/coordinator/course" element={<ViewCourseInsystemByCoordinator />} />
              <Route path="/coordinator/createSchedule" element={<CoordinatorCreateSchedulePage/>}/>
              <Route path="/coordinator/report" element={<CoordinatorViewBarChart/>}/>
               <Route path="/coordinator/ShowSchedule" element={<CoordinatorViewSchedulePage/>} />
              <Route path="/coordinator/createIntern" element={<CoordinatorAddInternToCoursePage/>}/>
              <Route path="/coordinator/feedback" element={<CoordinatorFeedbackCoursePage/>}/>
              <Route path="/coordinator/feedback/:courseId" element={<CoordinatorFeedbackInternPage/>}/>
              <Route path="/coordinator/viewFeedback" element={<SelectCourseFeedbackPage/>}/>
              <Route path="/coordinator/viewFeedback/:courseId" element={<ViewCourseFeedbackPage/>}/>
              <Route path="/verifyEmail" element={<VerificationEmail />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/profile" element={<ViewProfilePage/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
};

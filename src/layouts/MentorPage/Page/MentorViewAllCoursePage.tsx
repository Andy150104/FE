import React, { useEffect, useState } from 'react';
import "../../../css/managertable.css"; // Import CSS
import { HeaderWorkplace } from '../../HeaderAndFooter/HeaderWorkplace';
import { NavbarManager } from '../../HeaderAndFooter/Navbar/NavbarManager';
import { Footer } from '../../HeaderAndFooter/Footer';
import { CourseMentorCard } from '../Component/CourseMentorCard';
import { ViewAllCourseMentor } from '../Component/ViewAllCourseMentor';
import { NavbarMentor } from '../../HeaderAndFooter/Navbar/NavbarMentor';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';
import useAuth from '../../../context/useAuth';

export const MentorViewAllCoursePage: React.FC = () => {
  useAuth(['ROLE_MENTOR']);


  return (
    <div className="d-flex flex-column">
      <HeaderWorkplace />
      <div>
      <NavbarMentor/>
      </div>
      <div>
        
        {/* <>
          {mentorId !== 0 && <CourseMentorCard mentorId={mentorId} />}
        </> */}
        <ViewAllCourseMentor/>
        {/* <ShowCourse/> */}
      </div>
      <Footer />
    </div>
  );
};

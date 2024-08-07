import React, { useEffect, useState } from 'react';
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import { NavbarManager } from "../HeaderAndFooter/Navbar/NavbarManager";
import { ViewApplication } from "./ViewApplication";
import { UpdateJobApplicationPopup } from "../popup/UpdateJobApplicationPopup";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { ShowCourse } from './ShowCourse';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { CreateEmployee } from './CreateEmployee';
import Cookies from 'js-cookie';

export const ManagerCreateAccount: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const navigate = useNavigate();
  const {showToast}= useToast();
  const [user, setUser] = useState<{ role: string } | null>(null);
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("role ne: " + parsedUser.role);
      if(parsedUser.role !== "ROLE_MANAGER"){
        navigate("/");
        showToast("You aren't permitted to access","warn");
      }
    } else {
      navigate("/");
    }
  }, []);
  

  return (
    <div className="d-flex flex-column">
      <HeaderWorkplace/>
      <div>
        <NavbarManager/>
      </div>
      <div>
        <CreateEmployee/>
        {/* <ShowCourse/> */}
      </div>
      <Footer />
    </div>
  );
}

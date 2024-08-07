import React, { useEffect, useState } from 'react';
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import { NavbarManager } from "../HeaderAndFooter/Navbar/NavbarManager";
import { UpdateJobApplicationPopup } from "../popup/UpdateJobApplicationPopup";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { ShowCourse } from './ShowCourse';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { ViewIntern } from './CertificateJob/ViewIntern';

export const ViewInternPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState<{ role: string } | null>(null);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const navigate = useNavigate();
  const {showToast}= useToast();
  const [role,setRole]= useState<string>("");

  return (
    <div className="d-flex flex-column">
      <HeaderWorkplace/>
      <div>
        <NavbarManager/>
      </div>
      <div>
        <ViewIntern/>
      </div>
      <Footer />
    </div>
  );
}

import React, { useState } from "react";
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderWorkplace } from "../HeaderAndFooter/HeaderWorkplace";
import { NavbarManager } from "../HeaderAndFooter/Navbar/NavbarManager";
import { UpdateJobApplicationPopup } from "../popup/UpdateJobApplicationPopup";
import "../../css/managertable.css"; // Nhớ import CSS đã tạo
import { ViewRegisterUser } from "./ViewRegisterUser";
import { Header } from "../HeaderAndFooter/Header";
import { NavbarAdmin } from "../HeaderAndFooter/Navbar/NavbarAdmin";

export const AdminPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <HeaderWorkplace />
      <div>
      <NavbarAdmin/>
      </div>
      <div>
        <ViewRegisterUser />
      </div>
      <Footer />
    </>
  );
};

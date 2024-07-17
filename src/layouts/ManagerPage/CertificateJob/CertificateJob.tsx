import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ApiSendCertificate } from "../../../apis/ManagerApis/ApiSendCertificate";
import { useToast } from "../../../context/ToastContext";
import { Loading } from "../../Loading/Loading";
import UserInSysTem from "../../../model/UserInSysTem";
import { CSSTransition } from "react-transition-group";
import "../../../css/CertificateJob/certificate.css";
import logo from "../../../images/logoSample-.png";
import signature from "../../../images/Signature.png";
interface CertificateGeneratorProps {
  user: UserInSysTem; // Define proper user type based on your data structure
  onComplete: () => void;
  managerName: string;
  resetPdfUrl: () => void;
  updatePdfUrl: (url: string) => void;
}

export const CertificateJob: React.FC<CertificateGeneratorProps> = ({
  user,
  onComplete,
  managerName,
  resetPdfUrl,
  updatePdfUrl,
}) => {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);

  const generatePdf = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = 297; // A4 width in mm (landscape)
    const pdfHeight = 210; // A4 height in mm (landscape)
    const pdf = new jsPDF("landscape", "mm", [pdfWidth, pdfHeight]);
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    const pdfBlob = pdf.output("blob");
    try {
      setLoading(true);
      if (user) {
        const data = await ApiSendCertificate(pdfBlob, user.email);
        showToast(data, "success");
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
    updatePdfUrl(pdfUrl); // Update PDF URL in parent component state
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSignatureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setSignatureUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <CSSTransition in={!!user} timeout={300} classNames="fade" unmountOnExit>
      <div className={`container-fluid`}>
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div>
            <div ref={certificateRef} className="certificate-container">
              <div className="certificate-header">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="certificate-logo" />
                ) : (
                  <img src={logo} alt="Logo" className="certificate-logo" />
                )}
                <h1 className="certificate-title">
                  CERTIFICATE OF INTERNSHIP COMPLETION
                </h1>
              </div>
              <p className="certificate-certifies">This certifies that</p>
              <h2 className="certificate-recipient">{user.fullName}</h2>
              <p className="certificate-completion">
                has successfully completed the internship program at
              </p>
              <h3 className="certificate-company">{user.companyName}</h3>
              <p className="certificate-subtext">
                with outstanding performance and dedication.
              </p>
              <div className="certificate-footer">
                <div className="certificate-signature">
                  {signatureUrl ? (
                    <img
                      src={signatureUrl}
                      alt="Signature"
                      className="signature-image"
                    />
                  ) : (
                    <img
                      src={signature}
                      alt="Signature"
                      className="signature-image"
                    />
                  )}
                  <p className="certificate-signer">{managerName}</p>
                  <p className="certificate-role">{user.companyName}</p>
                </div>
              </div>
              {/* <p className="certificate-verification">
                Verify completion at{" "}
                <a href="http://localhost:3000">http://localhost:3000</a>
              </p> */}
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button className="button-send-certificate" onClick={generatePdf}>
                Send Certificate
              </button>
              <button
                className="button-close"
                onClick={() => {
                  resetPdfUrl();
                  onComplete();
                }}
              >
                Close
              </button>
              <div>
                <label htmlFor="logo-upload" className="button-logo">
                  Upload Logo
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  onChange={handleLogoUpload}
                  style={{ display: "none" }}
                />
              </div>
              <div>
                <label htmlFor="signature-upload" className="button-signature">
                  Upload Signature
                </label>
                <input
                  id="signature-upload"
                  type="file"
                  onChange={handleSignatureUpload}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </CSSTransition>
  );
};

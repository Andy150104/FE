import React, { useEffect, useState } from "react";
import "../../css/popup.css";
import { JobApplication } from "../../model/JobApplication";
import { ApiUpdateStatus } from "../../apis/ApiUpdateStatus";
import { useToast } from "../../context/ToastContext";
import Cookies from "js-cookie";

interface UpdateJobApplicationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobApplication: JobApplication | null;
  onUpdateStatus: (id: number, status: number) => void;
}

export const UpdateJobApplicationPopup: React.FC<
  UpdateJobApplicationPopupProps
> = ({ isOpen, onClose, jobApplication, onUpdateStatus }) => {
  const [animationClass, setAnimationClass] = useState("popup-entering");
  const [isClosing, setIsClosing] = useState(false);
  const [status, setStatus] = useState<number>(0);
  const { showToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [user, setUser] = useState<{
    user_id: number;
    company_id: number;
  } | null>(null);
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserId(parsedUser.user_id);
    }
  }, [userId]);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setAnimationClass("popup-entering");
      setTimeout(() => {
        setAnimationClass("popup-entered");
      }, 100);
      if (jobApplication) {
        console.log("Job " + jobApplication.status);
        if(jobApplication.status==null){
          setStatus(10);
        }
      }
    } else {
      setAnimationClass("popup-exiting");
      setTimeout(() => {
        setIsClosing(true);
      }, 300);
    }
  }, [isOpen, jobApplication]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (jobApplication) {
        if (userId) {
          const data = await ApiUpdateStatus(status, jobApplication.id, userId);
          showToast(data, "success");
          onUpdateStatus(jobApplication.id, status);
        }
      }
      setLoading(false);
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error occurred:", error.message);
        showToast(error.message, "error");
      } else {
        console.error("Unexpected error:", error);
        showToast("An unexpected error occurred", "error");
      }
      setLoading(false);
      onClose();
    }
  };

  if (isClosing) return null;

  return (
    <div className={`blur-background ${animationClass}`}>
      <div className="container d-flex align-items-center justify-content-center h-100">
        <div className={`popup-content`}>
          <h2>Update Job Application</h2>
          <form onSubmit={handleSubmit}>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <input
                  type="text"
                  id="input"
                  value={jobApplication?.fullName || ""}
                  required
                />
                <label>Name</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="styled-input">
                  <input
                    type="text"
                    id="input"
                    value={jobApplication?.email || ""}
                    required
                  />
                  <label>Email</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="styled-input" style={{ float: "right" }}>
                  <select
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                    required
                    id="input"
                  >
                    <option value={10}>Pending</option>
                    <option value={0}>Reject</option>
                    <option value={1}>Accept</option>
                    <option value={2}>Pending InterView</option>
                    <option value={3}>Absent</option>
                    <option value={4}>Passed</option>
                    <option value={5}>Pending Rescheduling</option>
                  </select>
                </div>
              </div>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center">
                <a href="#" className="btn btn-primary btn-lg disabled">
                  Loading
                </a>
              </div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            )}
          </form>
          <i
            className="fa-solid fa-x position-absolute top-0 end-0"
            id="x-button"
            onClick={onClose}
          ></i>
          <button
            className="btn btn-secondary position-absolute bottom-0 start-50 translate-middle-x close-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

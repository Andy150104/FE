import React, { useEffect, useState } from 'react';
import '../../css/popup.css';
import { JobApplication } from '../../model/JobApplication';
import { ApiUpdateStatus } from '../../apis/ApiUpdateStatus';
import { useToast } from '../../context/ToastContext';

interface UpdateJobApplicationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobApplication: JobApplication | null;
  onUpdateStatus: (id: number, status: number) => void;
}

export const UpdateJobApplicationPopup: React.FC<UpdateJobApplicationPopupProps> = ({ isOpen, onClose, jobApplication, onUpdateStatus }) => {
  const [animationClass, setAnimationClass] = useState('popup-entering');
  const [isClosing, setIsClosing] = useState(false);
  const [status, setStatus] = useState<number>(0);
  const {showToast} = useToast();

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setAnimationClass('popup-entering');
      setTimeout(() => {
        setAnimationClass('popup-entered');
      }, 100);
      if (jobApplication) {
        setStatus(jobApplication.status);
      }
    } else {
      setAnimationClass('popup-exiting');
      setTimeout(() => {
        setIsClosing(true);
      }, 300); 
    }
  }, [isOpen, jobApplication]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (jobApplication) {
        await ApiUpdateStatus(status, jobApplication.id);
        switch(status){
            case 0:
              showToast('Application rejected!', 'success');
              onUpdateStatus(jobApplication.id, status);
              onClose();
              break;
            case 1:
              showToast('Application accepted!', 'success');
              onUpdateStatus(jobApplication.id, status);
              onClose();
              break;
            case 2:
              showToast('You can not set Pending!', 'error');
              break;
              
            default:
              onClose();
              break;
        }
      }
    } catch (error) {
      showToast('You can not set Pending!', 'error');

    }
  };

  if (isClosing) return null;

  return (
    <div className={`blur-background ${animationClass}`}>
      <div className='container d-flex align-items-center justify-content-center h-100'>
        <div className={`popup-content`}>
          <h2>Update Job Application</h2>
          <form onSubmit={handleSubmit}>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <input
                  type="text"
                  id="input"
                  value={jobApplication?.fullName || ''}
                  required
                />
                <label>Name</label>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-6 col-sm-12">
                <div className="styled-input">
                  <input
                    type="text"
                    id="input"
                    value={jobApplication?.email || ''}
                    required
                  />
                  <label>Email</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="styled-input" style={{ float: "right" }}>
                  <select value={status}  onChange={(e) => setStatus(Number(e.target.value))} required id="input">
                  <option value={"2"}>Pending</option>
                    <option value={0}>Reject</option>
                    <option value={1}>Accept</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
          <i className="fa-solid fa-x position-absolute top-0 end-0" id='x-button' onClick={onClose}></i>
          <button className="btn btn-secondary position-absolute bottom-0 start-50 translate-middle-x close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

import React, { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJobDetail } from "../../apis/ApiJobById";
import { Job } from "../../model/type";
import "../../css/JobDetail.css";
import logoSample from "../../images/logoSample-.png";
import { applyJob } from "../../apis/ApiApplyJob";
import { useToast } from "../../context/ToastContext";
import { Loading } from "../Loading/Loading";
import { motion } from "framer-motion";
import { getCompanyLogo } from "../../apis/Home/ApiLogo";

export const JobDetailList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [jobId, setJobId] = useState<number>(0);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cv, setCv] = useState<File | null>(null);
  const { showToast } = useToast();
  const [logoUrl, setLogoUrl] = useState<string>("");
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        if (id) {
          const data: Job = await getJobDetail(parseInt(id));
          console.log(data);
          setJob(data);
          const logo = await getCompanyLogo(id);
          setLogoUrl(logo);
        }
      } catch (error) {
        console.error("Error fetching job detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id, jobId]);

  const formatParagraphs = (text: string) => {
    return text
      .split("\\n")
      .map((str, index) => <p key={index.toString()}>{str}</p>);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type !== "application/pdf") {
      showToast("File must be a PDF", "error");
      setCv(null);
      (document.getElementById("input-cv") as HTMLInputElement).value = "";
    } else if (file) {
      setCv(file);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cv || !id) return;
    setLoading(true);
    try {
      const response = await applyJob(parseInt(id), email, fullName, cv);
      showToast("Success to apply!!", "success");
      showToast("Please check your email to verify job application", "warn");
      setFullName("");
      setEmail("");
      setCv(null);
    } catch (error) {
      console.error("Error submitting job application:", error);
      alert("Failed to submit job application.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (!job) return <div>Job not found</div>;

  return (
    <div className="job-detail">
      <motion.div
        className="container rounded mt-5 mb-5 d-flex justify-content-center align-items-center"
        id="job-block-in-job-detail"
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="row">
          <div className="col-md-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Company Logo"
                id="logo"
                style={{ background: "transparent" }}
              />
            ) : (
              <img src={logoSample} alt="Sample Logo" id="logo" />
            )}
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-9">
                <p className="fw-bold" id="p-job">
                  {job.jobName}
                </p>
                <p id="p-location">{job.company.location}</p>
                <p>Company: {job.company.companyName}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="container rounded mt-5 mb-5 col-md-12"
        id="job-description-block"
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 id="h1-job-description">Job Description</h1>
        {formatParagraphs(job.jobDescription)}
      </motion.div>
      <div
        className="container rounded mb-5 d-flex justify-content-center align-items-center"
        id="job-block"
      >
        <div className="row input-container">
          <h1 id="h1-apply-now"> Apply Now</h1>
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="col-xs-12">
                  <div className="styled-input wide">
                    <input
                      type="text"
                      id="input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    <label>Name</label>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="styled-input">
                    <input
                      type="text"
                      id="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label>Email</label>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <input
                    type="hidden"
                    value={job.id}
                    onChange={(e) => e.target.value}
                  />
                  <div className="styled-input" style={{ float: "right" }}>
                    <input
                      className=""
                      type="file"
                      id="input-cv"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="styled-input wide">
                    <textarea></textarea>
                    <label>Message</label>
                  </div>
                </div>
                <div className="col-xs-12">
                  <button
                    type="submit"
                    id="btn-apply"
                    className="btn-lrg submit-btn"
                  >
                    Apply
                    <span className="first"></span>
                    <span className="second"></span>
                    <span className="third"></span>
                    <span className="fourth"></span>
                  </button>
                </div>
              </motion.div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

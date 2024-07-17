import React, { useState, useEffect } from "react";
import { getJobs,Job,SearchJobsResponse } from "../../apis/getJobs";
import "../../css/jobList.css";
import logoSample from "../../images/logoSample-.png";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Field } from "../../model/Field";
import {getField } from "../../apis/ApiJob";
import { getCompanyLogo } from "../../apis/Home/ApiLogo";
import { JobLogo } from "./Logo/Logo";
interface JobListProps {
  search: string;
}

export const JobList: React.FC<JobListProps> = ({ search }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const count = useMotionValue(0);
  const [fields, setFields] = useState<Field[]>([]);
  const rounded = useTransform(count, Math.round);
  const [roundedCount, setRoundedCount] = useState<number>(0);
  const [fieldId, setFieldId] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");
  useEffect(() => {
    const unsubscribe = rounded.onChange((v) => setRoundedCount(v));
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get("search") || " ";
    const field = params.get("fieldId") || "";
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data: SearchJobsResponse = await getJobs(
          searchTerm,
          pageNo,
          pageSize,
          parseInt(field)
        );
        setJobs(data.jobs);
        setTotalItems(data.totalItems);
        animate(count, data.totalItems, { duration: 1 });
        const logo = await getCompanyLogo(jobId);
          setLogoUrl(logo);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [location.search, pageNo, pageSize,jobId]);

  useEffect(() => {
    setPageSize(5);
  }, [search]);

  const handleJobClick = (id: number) =>{
    navigate(`/jobs/${id}`)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getField();
        setFields(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);
  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFieldId = e.target.value;
    setFieldId(selectedFieldId);
    const params = new URLSearchParams(location.search);
    params.set("fieldId", encodeURIComponent(selectedFieldId));
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };
  return (
    <div className="application-container-job">
      <h1 className="text-start py-3 display-4 display-sm-3 display-md-2 display-lg-1" id="h1-aboutUs">
        {roundedCount} jobs in Vietnam
      </h1>
      <select 
      required
      value={fieldId}
      onChange={handleFieldChange}
      id="filter">
              <option value="">
                    Select Field
                  </option>
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.fieldName}
                    </option>
                  ))}
        </select>
      <ul>
        {jobs.map((job) => (
          <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          >
          <div key={job.id} id="job" onClick={() => handleJobClick(job.id)}>
            <div className="container-fluid rounded mt-5 mb-5" id="job-block-in-job-list">
              <div className="row">
                <div className="col-md-2">
               <JobLogo jobId={job.id}/>
                </div>
                <div className="col-md-10">
                <div className="row">
                <div className="col-md-9">
                  <p className="fw-bold" id="p-job">
                    {job.jobName}
                  </p>
                  <p id="p-location">{job.company.location}</p>
                  <p><strong>Company: </strong>{job.company.companyName}</p>
                  <p><strong>Field: </strong>{job.field.fieldName}</p>
                  </div>
                  <div className="col-md-3">
                  <button id="btn-apply" onClick={() => handleJobClick(job.id)}>
                  Apply
                      <span className="first"></span>
                      <span className="second"></span>
                      <span className="third"></span>
                      <span className="fourth"></span>
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          </motion.div>

        ))}
      </ul>
      <div>
        {jobs.length > 0 && (
          <button
            className="btn btn-1"
            onClick={() => setPageSize(pageSize + 5)}
            id="btn-show-more"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

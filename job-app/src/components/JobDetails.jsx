import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsData } from '../services/mockData';

export default function JobDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);
  
  const job = jobsData.find(j => j.id === id);

  if (!job) return <div className="container mt-5"><h2>Job not found</h2></div>;

  const handleApply = () => {
    if (!user) {
      alert("Please login first to apply for this job.");
      navigate('/auth');
    } else {
      setApplied(true);
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i> Back to Jobs</button>
      <div className="card shadow-sm border-0 border-top border-4 border-teal">
        <div className="card-body p-5">
          <h2 className="text-teal mb-3">{job.title}</h2>
          <h4 className="text-muted mb-4"><i className="bi bi-building"></i> {job.company} | <i className="bi bi-geo-alt"></i> {job.location}</h4>
          <hr />
          <h5 className="mt-4">Job Description</h5>
          <p className="lead fs-6">{job.description}</p>
          <p><strong>Date Posted:</strong> {job.postedDate}</p>
          <div className="mt-5">
            {applied ? (
              <div className="alert alert-success"><i className="bi bi-check-circle"></i> Application Submitted Successfully!</div>
            ) : (
              <button className="btn btn-primary btn-lg px-5" onClick={handleApply}>Apply Now</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
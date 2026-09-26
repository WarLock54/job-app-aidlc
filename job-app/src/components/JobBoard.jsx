import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsData } from '../services/mockData';

export default function JobBoard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? job.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <input type="text" className="form-control" placeholder="Search by job title or company..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Engineering">Engineering</option>
            <option value="Data">Data</option>
            <option value="Product">Product</option>
            <option value="Design">Design</option>
          </select>
        </div>
      </div>
      
      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="col-md-6 mb-4">
              <div className="card job-card h-100 p-3" onClick={() => navigate(`/job/${job.id}`)}>
                <div className="card-body">
                  <h5 className="card-title text-teal">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-building"></i> {job.company}</h6>
                  <p className="card-text"><i className="bi bi-geo-alt"></i> {job.location}</p>
                  <span className="badge bg-secondary">{job.category}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <h5 className="text-muted">No jobs found matching your criteria.</h5>
          </div>
        )}
      </div>
    </div>
  );
}
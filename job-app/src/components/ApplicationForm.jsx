import React, { useState } from 'react';

export default function ApplicationForm({ applicantEmail, onSubmit, onCancel }) {
  const [fullName, setFullName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ fullName, coverLetter, applicantEmail });
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded p-4 bg-light">
      <h5 className="mb-3">Application Form</h5>
      <p className="text-muted small">Applying as: {applicantEmail}</p>
      <div className="mb-3">
        <label htmlFor="applicantName" className="form-label">Full Name</label>
        <input
          id="applicantName"
          type="text"
          className="form-control"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
        <textarea
          id="coverLetter"
          className="form-control"
          rows="4"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">Submit Application</button>
      <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
}
const STORAGE_KEY = 'applications';

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export const applicationService = {
  submitApplication: (jobId, applicantEmail, data) => {
    const applications = readAll();
    const record = {
      id: `${jobId}-${Date.now()}`,
      jobId,
      applicantEmail,
      ...data,
      submittedAt: new Date().toISOString(),
    };
    applications.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return { success: true, applicationId: record.id };
  },
  getApplicationsForUser: (applicantEmail) => {
    return readAll().filter((a) => a.applicantEmail === applicantEmail);
  },
};
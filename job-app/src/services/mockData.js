const generateJobs = () => {
  const titles = ["Frontend Developer", "Backend Engineer", "Data Scientist", "Product Manager", "DevOps Engineer", "UX Designer", "Cloud Architect"];
  const companies = ["TechNova", "CloudSync", "DataCorp", "InnoSoft", "WebWorks", "AeroTech", "Global AI Hub"];
  const locations = ["Remote", "New York, NY", "San Francisco, CA", "London, UK", "Berlin, Germany", "Istanbul, TR"];
  const categories = ["Engineering", "Data", "Product", "Design"];

  const jobs = [];
  for (let i = 1; i <= 55; i++) {
    jobs.push({
      id: i.toString(),
      title: titles[i % titles.length],
      company: companies[i % companies.length],
      location: locations[i % locations.length],
      category: categories[i % categories.length],
      description: `This is a fantastic opportunity to work as a ${titles[i % titles.length]} at ${companies[i % companies.length]}. You will be responsible for driving impact, collaborating with cross-functional teams, and delivering high-quality, scalable solutions in a dynamic environment.`,
      postedDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
    });
  }
  return jobs;
};

export const jobsData = generateJobs();
import { Status } from './statusEnum';

export const exampleApplications = [
  {
    id: 1,
    position: 'Software Engineer',
    company: 'Tech Innovators Inc.',
    status: Status.Applied,
    location: 'San Francisco, CA',
    salary: '$120,000',
    url: 'https://www.techinnovators.com',
    notes: 'This is a note about the job application.',
    updatedAt: '2022-01-01',
  },
  {
    id: 2,
    position: 'Product Manager',
    company: 'Creative Solutions Ltd.',
    status: Status.Interviewing,
    location: 'New York, NY',
    salary: '$130,000',
    url: 'https://www.creativesolutions.com',
    notes:
      'This is a note about the job application. It could include information about the company, the role, or the interview process.',
    updatedAt: '2022-01-02',
  },
  {
    id: 3,
    position: 'UX Designer',
    company: 'Design Co.',
    status: Status.Rejected,
    location: 'Los Angeles, CA',
    salary: '$110,000',
    url: 'https://www.designco.com',
    notes:
      'This is a note about the job application. It could include information about the company, the role, or the interview process.',
    updatedAt: '2022-01-03',
  },
  {
    id: 4,
    position: 'Data Analyst',
    company: 'Data Insights',
    status: Status.OfferReceived,
    location: 'Chicago, IL',
    salary: '$100,000',
    url: 'https://www.datainsights.com',
    notes:
      'This is a note about the job application. It could include information about the company, the role, or the interview process.',
    updatedAt: '2022-01-04',
  },
];

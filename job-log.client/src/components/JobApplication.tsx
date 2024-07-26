import { Typography, Box, Paper } from '@mui/material';
import { Status, statusColors } from '../assets/statusEnum';

interface JobApplicationProps {
  position: string;
  company: string;
  status: Status;
  location: string;
  salary: string;
  url: string;
  notes: string;
  updatedAt: string;
  onClick: () => void; // Handler for opening the modal
}

const JobApplication = ({
  position,
  company,
  status,
  location,
  salary,
  url,
  notes,
  updatedAt,
  onClick,
}: JobApplicationProps) => {
  const statusColor = statusColors[status];

  return (
    <Paper onClick={onClick} sx={{ cursor: 'pointer' }}>
      <Box p={2} textOverflow={'ellipsis'}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Typography variant='h6'>{position}</Typography>
          <Box
            sx={{
              border: `2px solid ${statusColor}`,
              borderRadius: '4px',
              padding: '4px 8px',
            }}
          >
            <Typography variant='body2'>{status}</Typography>
          </Box>
        </Box>
        <Typography variant='body1'>{company}</Typography>
        <Typography variant='body2'>{location}</Typography>
        <Typography variant='body2'>{salary}</Typography>
        <Typography
          variant='body2'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {url}
        </Typography>
        <Typography variant='body2'>{notes}</Typography>
        <Typography variant='body2'>Last Activity: {updatedAt}</Typography>
      </Box>
    </Paper>
  );
};

export default JobApplication;

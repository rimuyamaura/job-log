import { Typography, Box, Paper, Link } from '@mui/material';
import { Status, statusColors } from '../assets/statusEnum';
import useFormatDate from '../hooks/useFormatDate';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from 'framer-motion';

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
  const formattedDate = useFormatDate(updatedAt);

  return (
    <Paper
      onClick={onClick}
      component={motion.div}
      sx={{
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        overflow: 'hidden',
        p: 2,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -1, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
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
        {salary ? <Typography variant='body2'>${salary}</Typography> : null}
        <Typography variant='body2' fontStyle='italic'>
          {notes}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <IconButton
            component={Link}
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            sx={{ padding: 0 }}
            aria-label='Open link'
            disabled={!url}
          >
            <OpenInNewIcon />
          </IconButton>
          <Typography
            variant='overline'
            color={'gray'}
            sx={{ textAlign: 'right', flexGrow: 1 }}
          >
            Last Activity: {formattedDate}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default JobApplication;

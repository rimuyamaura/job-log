import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Status, statusColors } from '../assets/statusEnum';

interface StatcardProps {
  name: string;
  value: number;
}

const Statcard = ({ name, value }: StatcardProps) => {
  const borderColor = Object.values(Status).includes(name as Status)
    ? statusColors[name as Status]
    : 'background.default';

  return (
    <Paper
      component={motion.div}
      sx={{
        backdropFilter: 'blur(8px)',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: borderColor,
        p: 2,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -1, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
    >
      <Box>
        <Typography
          noWrap
          sx={{
            display: 'block',
            alignItems: 'center',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.secondary',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Statcard;

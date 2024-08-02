import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';
import { Status, statusColors } from '../assets/statusEnum';

const StatusDistributionChart = ({ data }: any) => {
  const statusCounts = Object.keys(data)
    .filter((status) => data[status as Status] > 0)
    .map((status) => ({
      name: status as Status,
      count: data[status as Status],
    }));

  return (
    <Paper
      component={motion.div}
      sx={{
        backdropFilter: 'blur(8px)',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'background.default',
        p: 2,
        height: 400,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -1, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
    >
      <Typography variant='h6' align='center' gutterBottom>
        Job Application Status
      </Typography>

      <Box component={motion.div} sx={{ height: 'calc(100% - 60px)' }}>
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <PieChart>
            <Pie
              data={statusCounts}
              dataKey='count'
              nameKey='name'
              labelLine={false}
              cx='50%'
              cy='50%'
              outerRadius={80}
              fill='#8884d8'
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {statusCounts.map((status, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={statusColors[status.name as Status] || '#8884d8'}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4B5563',
              }}
              itemStyle={{ color: '#E5E7EB' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default StatusDistributionChart;

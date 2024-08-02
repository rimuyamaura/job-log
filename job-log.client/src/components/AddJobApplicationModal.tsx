import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Status } from '../assets/statusEnum';
import useShowAlert from '../hooks/useShowAlert';

interface JobApplicationModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newJobApplication: any) => void;
}

const AddJobApplicationModal = ({
  open,
  onClose,
  onSave,
}: JobApplicationModalProps) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<Status>(Status.Applied); // Use the enum type
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const showAlert = useShowAlert();

  const handleSave = () => {
    const newJobApplication = {
      position,
      company,
      status,
      location,
      salary,
      url,
      notes,
      updatedAt: new Date().toISOString(),
    };
    onSave(newJobApplication); // Pass new job application to parent function
    onClose();
    showAlert('Job Application Saved!', 'success');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Add Job Application'}</DialogTitle>
      <DialogContent>
        <Box component='form' sx={{ mt: 2 }}>
          <TextField
            label='Position'
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            sx={{ mb: 2 }}
            required
            helperText={!position ? 'Position is required' : ''}
          />
          <TextField
            label='Company'
            fullWidth
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            sx={{ mb: 2 }}
            required
            helperText={!company ? 'Company is required' : ''}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              label='Status'
              required
            >
              {Object.values(Status).map((statusOption) => (
                <MenuItem key={statusOption} value={statusOption}>
                  {statusOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label='Location'
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Salary'
            fullWidth
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label='URL'
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Notes'
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={4}
            sx={{ mb: 1 }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mx: 2 }}>
        <Button
          onClick={handleSave}
          variant='contained'
          color='primary'
          disabled={!position || !company || !status}
        >
          Save
        </Button>
        <Button onClick={onClose} variant='contained' color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobApplicationModal;

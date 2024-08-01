import { useState, useEffect } from 'react';
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

interface JobApplicationModalProps {
  open: boolean;
  onClose: () => void;
  application?: {
    id: number;
    position: string;
    company: string;
    status: Status;
    location: string;
    salary: string;
    url: string;
    notes: string;
    updatedAt: string;
  };
  onSave: (updatedApplication: any) => void;
  onDelete?: (id: number) => void;
}

const JobApplicationModal = ({
  open,
  onClose,
  application,
  onSave,
  onDelete,
}: JobApplicationModalProps) => {
  const [position, setPosition] = useState(application?.position || '');
  const [company, setCompany] = useState(application?.company || '');
  const [status, setStatus] = useState<Status>(
    application?.status || Status.Applied
  ); // Use the enum type
  const [location, setLocation] = useState(application?.location || '');
  const [salary, setSalary] = useState(application?.salary || '');
  const [url, setUrl] = useState(application?.url || '');
  const [notes, setNotes] = useState(application?.notes || '');

  useEffect(() => {
    if (application) {
      setPosition(application.position);
      setCompany(application.company);
      setStatus(application.status);
      setLocation(application.location);
      setSalary(application.salary);
      setUrl(application.url);
      setNotes(application.notes);
    }
  }, [application]);

  const handleSave = () => {
    const updatedApplication = {
      id: application?.id,
      position,
      company,
      status,
      location,
      salary,
      url,
      notes,
      updatedAt: new Date().toISOString(),
    };
    onSave(updatedApplication); // Pass new details onto parent function
    onClose();
  };

  const handleDelete = () => {
    if (application && onDelete) {
      onDelete(application.id);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {application ? 'Edit Job Application' : 'Add Job Application'}
      </DialogTitle>
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
            sx={{ mb: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mx: 2 }}
      >
        <Box sx={{ flex: 1 }}>
          {application && (
            <Button onClick={handleDelete} variant='contained' color='error'>
              Delete
            </Button>
          )}
        </Box>
        <Box>
          <Button
            onClick={handleSave}
            variant='contained'
            color='primary'
            disabled={!position || !company || !status}
          >
            Save
          </Button>
          <Button
            onClick={onClose}
            variant='contained'
            color='secondary'
            sx={{ ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default JobApplicationModal;

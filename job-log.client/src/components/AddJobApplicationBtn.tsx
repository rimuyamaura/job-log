import { useState } from 'react';
import { Button } from '@mui/material';
import { JobApplicationModal } from '.';

const AddJobApplication = ({
  onSave,
}: {
  onSave: (application: any) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSave = (newApplication: any) => {
    onSave(newApplication);
    handleClose();
  };

  return (
    <>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Add Job Application
      </Button>
      <JobApplicationModal
        open={modalOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
};

export default AddJobApplication;

import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddJobApplicationModal } from '.';

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
      <Button
        onClick={handleOpen}
        variant='contained'
        color='primary'
        size='large'
        sx={{
          height: { xs: 60, sm: 80 },
          width: { xs: 150, sm: 200 },
          position: 'fixed',
          bottom: { xs: 25, sm: 25, md: 50 },
          right: { xs: 25, sm: 25, md: 50 },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AddIcon fontSize='large' sx={{ marginBottom: '3px' }} />
        <Typography sx={{ fontWeight: 'bold', mx: 1 }}>Create</Typography>
      </Button>
      <AddJobApplicationModal
        open={modalOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
};

export default AddJobApplication;

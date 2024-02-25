import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface DialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  formComponent: React.ReactNode;
}

function ConceptDialog({ title, open, onClose, formComponent }: DialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={{ padding: '1em' }}>
        {formComponent}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConceptDialog;

import React from 'react';
import { Concept } from '../model/Concept';
import { Dialog, DialogTitle, DialogContent, Typography, List, ListItem, ListItemText, ListItemIcon, Button, TextareaAutosize } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type ViewConceptProps = {
  open: boolean;
  concept: Concept | null;
  onClose: () => void;
  onEditConcept: (concept: Concept) => void;
  onDeleteConcept: (conceptId: string) => void;
};

function ViewConcept({ open, concept, onClose, onEditConcept, onDeleteConcept }: ViewConceptProps) {
  const handleClose = () => {
    onClose();
  };

  const handleEdit = () => {
    if (concept) {
      onEditConcept(concept);
    }
  };

  const handleDelete = () => {
    if (concept) {
      onDeleteConcept(concept.id);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      {concept && (
        <>
          <DialogTitle>{concept.displayName}</DialogTitle>
          <DialogContent style={{ minWidth: '35vw', maxWidth: '35vw' }}>
            <Typography variant="body1" gutterBottom>Description:</Typography>
            <TextareaAutosize
              minRows={3}
              style={{ width: '100%', resize: 'none', overflowWrap: 'break-word' }}
              value={concept.description}
              readOnly
            />

            <List>
              <ListItem>
                <ListItemText primary="Concept ID" secondary={concept.id} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Parent IDs" secondary={concept.parentIds.join(', ')} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Child IDs" secondary={concept.childIds.join(', ')} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Alternate Names" secondary={concept.alternateNames.join(', ')} />
              </ListItem>
            </List>
          </DialogContent>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
            <Button startIcon={<EditIcon />} onClick={handleEdit}>Edit</Button>
            <Button startIcon={<DeleteIcon />} onClick={handleDelete} color="error">Delete</Button>
          </div>
        </>
      )}
    </Dialog>
  );
}

export default ViewConcept;

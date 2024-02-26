import React, { useState } from 'react';
import { Concept } from '../model/Concept';
import { Dialog, DialogTitle, DialogContent, Typography, List, ListItem, ListItemText, ListItemIcon, Button, TextareaAutosize, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles/ViewConceptStyles.css'

type ViewConceptProps = {
  open: boolean;
  concept: Concept;
  allConcepts: Concept[];
  onClose: () => void;
  onEditConcept: (concept: Concept) => void;
  onUpdateSelectedConcept: (concept: Concept) => void;
  onDeleteConcept: (conceptId: string) => void;
};

function ViewConcept({ open, concept, allConcepts, onClose, onUpdateSelectedConcept, onEditConcept, onDeleteConcept }: ViewConceptProps) {
  
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

  const handleLinkClick = (clickedConcept: Concept) => {
    onUpdateSelectedConcept(clickedConcept);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" id='view-dialog'>
      {concept && (
        <>
          <DialogTitle id='c-title'>{concept.displayName}</DialogTitle>
          <DialogContent id='dialog-content'>
            <List>
              <ListItem>
                <ListItemText primary="Description" secondary={concept.description} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Concept ID" secondary={concept.id} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Parent Concepts" secondary={
                    <List>
                      {concept.parentIds.map(parentId => {
                        const parentConcept = allConcepts.find(c => c.id === parentId);
                        return (
                          <ListItem key={parentId}>
                            {parentConcept ? (
                              <Link href="#" onClick={() => handleLinkClick(parentConcept)}>{parentConcept.displayName}</Link>
                            ) : (
                              <span>Parent concept not found</span>
                            )}
                          </ListItem>
                        );
                      })}
                    </List>
                  }/>
              </ListItem>
              <ListItem>
                <ListItemText primary="Child Concepts" secondary={
                  <List>
                    {concept.childIds.map(childId => {
                      const childConcept = allConcepts.find(c => c.id === childId);
                      return (
                        <ListItem key={childId}>
                          {childConcept ? (
                            <Link href="#" onClick={() => handleLinkClick(childConcept)}>{childConcept.displayName}</Link>
                          ) : (
                            <span>Child concept not found</span>
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                }/>
              </ListItem>
              <ListItem>
                <ListItemText primary="Alternate Names" secondary={concept.alternateNames.join(', ')} />
              </ListItem>
            </List>
          </DialogContent>
          <div id='buttons'>
            <Button startIcon={<EditIcon />} onClick={handleEdit}>Edit</Button>
            <Button startIcon={<DeleteIcon />} onClick={handleDelete} color="error">Delete</Button>
          </div>
        </>
      )}
    </Dialog>
  );
}

export default ViewConcept;

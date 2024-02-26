// ConceptTable.js
import React from 'react';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Concept } from '../model/Concept';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type ConceptTableProps = {
  concepts: Concept[];
  onEditConcept: (concept: Concept) => void;
  onViewConcept: (concept: Concept) => void;
  onDeleteConcept: (conceptId: string) => void;
};

function ConceptTable({ concepts, onEditConcept, onDeleteConcept, onViewConcept }: ConceptTableProps) {

  async function handleEdit(concept: Concept) {
    onEditConcept(concept);
  };
  async function handleDelete(conceptId: string) {
    onDeleteConcept(conceptId);
  };
  async function handleView(concept: Concept) {
    onViewConcept(concept);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>conceptId</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Parent IDs</TableCell>
            <TableCell>Child IDs</TableCell>
            <TableCell>Alternate Names</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {concepts.map((concept) => (
            <TableRow key={concept.id}>
            <TableCell>{concept.id}</TableCell>
            <TableCell>{concept.displayName}</TableCell>
            <TableCell>{concept.description}</TableCell>
            <TableCell>{Array.isArray(concept.parentIds) ? concept.parentIds.join(', ') : ''}</TableCell>
            <TableCell>{Array.isArray(concept.childIds) ? concept.childIds.join(', ') : ''}</TableCell>
            <TableCell>{Array.isArray(concept.childIds) ? concept.alternateNames.join(', ') : ''}</TableCell>
            <TableCell>
              <div style={{ display: 'flex', gap: '0.5em' }}>
                <IconButton color="primary" onClick={() => handleView(concept)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => handleEdit(concept)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(concept.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ConceptTable;

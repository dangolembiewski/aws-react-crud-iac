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
    <TableContainer component={Paper} style={{ border: '0.1rem solid #ccc', boxShadow: '0 0.6rem 0.6rem rgba(0, 0, 0, 0.1)' }}>      <Table>
        <TableHead style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
          <TableRow>
            <TableCell style={{fontWeight: 'bold' }}>Concept Id</TableCell>
            <TableCell style={{fontWeight: 'bold' }}>Name</TableCell>
            <TableCell style={{fontWeight: 'bold' }}>Description</TableCell>
            <TableCell style={{fontWeight: 'bold' }}>Parent IDs</TableCell>
            <TableCell style={{fontWeight: 'bold' }}>Child IDs</TableCell>
            <TableCell style={{fontWeight: 'bold' }}>Alternate Names</TableCell>
            <TableCell style={{fontWeight: 'bold' }}>Actions</TableCell>
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

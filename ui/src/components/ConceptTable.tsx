// ConceptTable.js
import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Concept } from '../model/Concept';

type ConceptTableProps = {
  concepts: Concept[];
  onEditConcept: (concept: Concept) => void;
  onDeleteConcept: (conceptId: string) => void;
};

function ConceptTable({ concepts, onEditConcept, onDeleteConcept }: ConceptTableProps) {

  async function handleEdit(concept: Concept) {
    onEditConcept(concept);
  };
  async function handleDelete(conceptId: string) {
    onDeleteConcept(conceptId);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Display Name</TableCell>
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
              <TableCell>{Array.isArray(concept.childIds) ? concept.childIds.join(', '): ''}</TableCell>
              <TableCell>{Array.isArray(concept.childIds) ? concept.alternateNames.join(', '): ''}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEdit(concept)}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(concept.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ConceptTable;

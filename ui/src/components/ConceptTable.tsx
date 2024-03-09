import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
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
    <TableContainer component={Paper} style={{ border: '0.1rem solid #ccc', boxShadow: '0 0.6rem 0.6rem rgba(0, 0, 0, 0.1)' }}><Table>
        <TableHead style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
          <TableRow>
            <TableCell style={{fontWeight: 'bold' }}>Name</TableCell>
            <TableCell style={{fontWeight: 'bold' }}>Description</TableCell>
            <TableCell style={{fontWeight: 'bold' }}># of Parents</TableCell>
            <TableCell style={{fontWeight: 'bold' }}># of Children</TableCell>
            <TableCell style={{fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {concepts.map((concept) => (
          <TableRow key={concept.id}>
            <TableCell style={{ wordWrap: 'break-word', maxWidth: '18rem' }}>
              {concept.displayName}
            </TableCell>
            <TableCell style={{ wordWrap: 'break-word', maxWidth: '25rem' }}>
              {concept.description}
            </TableCell>
            <TableCell>{Array.isArray(concept.parentIds) ? concept.parentIds.length : ''}</TableCell>
            <TableCell>{Array.isArray(concept.childIds) ? concept.childIds.length : ''}</TableCell>
            <TableCell>
              <div style={{ display: 'flex', gap: '0.5em' }}>
                <Tooltip title="View">
                  <IconButton color="primary" onClick={() => handleView(concept)}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton color="primary" onClick={() => handleEdit(concept)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="secondary" onClick={() => handleDelete(concept.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
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

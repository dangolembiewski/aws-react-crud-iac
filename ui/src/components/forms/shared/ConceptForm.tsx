import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { Concept } from '../../../model/Concept';

type ConceptFormProps = {
  concept: Concept;
  onSubmit: (concept: Concept) => void;
};

function ConceptForm({ concept, onSubmit }: ConceptFormProps){

  const [formConcept, setFormConcept] = useState<Concept>(concept);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "parentIds" || name === "childIds" || name === "alternateNames") {
      newValue = value.replace(/,+/g, ',');
      const arrayValue = newValue.split(',').map(item => item.trim());
      setFormConcept({ ...formConcept, [name]: arrayValue });
    } else {
      setFormConcept({ ...formConcept, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formConcept);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Concept ID"
            type="text"
            name="id"
            value={formConcept.id}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Display Name"
            type="text"
            name="displayName"
            value={formConcept.displayName}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formConcept.description}
            onChange={handleChange}
            variant="outlined"
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Parent IDs (comma-separated)"
            type="text"
            name="parentIds"
            value={Array.isArray(formConcept.parentIds) ? formConcept.parentIds.join(','): ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Child IDs (comma-separated)"
            type="text"
            name="childIds"
            value={Array.isArray(formConcept.childIds) ? formConcept.childIds.join(','): ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Alternate Names (comma-separated)"
            type="text"
            name="alternateNames"
            value={Array.isArray(formConcept.alternateNames) ? formConcept.alternateNames.join(',') : ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ConceptForm;

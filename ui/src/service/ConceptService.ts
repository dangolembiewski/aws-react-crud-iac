import outputs from '../../../backend/outputs.json';
import { Concept } from '../model/Concept';
import axios from 'axios';

const conceptsUrl = outputs.ApiStack.ConceptsApiEndpoint8A639911 + 'concepts'

export class ConceptService {

  public async createConcept(concept: Concept): Promise<string> {
    try {
      const response = await axios.post(conceptsUrl, concept);
      return response.data.id; 
    } catch (error) {
      console.error('Error creating concept:', error);
      throw error;
    }
  }

  public async updateConcept(concept: Concept): Promise<string> {
    try {
      const response = await axios.put(`${conceptsUrl}?id=${concept.id}`, concept);
      return response.data.id; 
    } catch (error) {
      console.error('Error creating concept:', error);
      throw error;
    }
  }
}
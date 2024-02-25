import outputs from '../../../backend/outputs.json';
import { Concept } from '../model/Concept';
import axios from 'axios';

const conceptsUrl = outputs.ApiStack.ConceptsApiEndpoint8A639911 + 'concepts'

export class ConceptService {
  public async getConcepts(): Promise<Concept[]> {
    try {
      const response = await axios.get<Concept[]>(conceptsUrl);
      return response.data; 
    } catch (error) {
      console.error('Error creating concept:', error);
      throw error;
    }
  }

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
      console.log(concept);
      const response = await axios.put(`${conceptsUrl}?id=${concept.id}`, concept);
      return response.data.id; 
    } catch (error) {
      console.error('Error creating concept:', error);
      throw error;
    }
  }
  public async deleteConcept(conceptId: string): Promise<string> {
    try {
      console.log(conceptId);
      const response = await axios.delete(`${conceptsUrl}?id=${conceptId}`);
      return response.data.id; 
    } catch (error) {
      console.error('Error creating concept:', error);
      throw error;
    }
  }
}
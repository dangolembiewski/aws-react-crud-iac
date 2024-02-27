import outputs from '../../../backend/outputs.json';
import { Concept } from '../model/Concept';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthService } from './AuthService';

const conceptsUrl = outputs.ApiStack.ConceptsApiEndpoint8A639911 + 'concepts'

export class ConceptService {

  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
  
  private async getRequestConfig(): Promise<AxiosRequestConfig> {
    try{
      const token = await this.authService.getJwtToken();
      console.log("Got token")
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } catch (error){
      throw(error)
    }
  }
  
  public async getConcepts(): Promise<Concept[]> {
    try {
      const config = await this.getRequestConfig();
      const response = await axios.get<Concept[]>(conceptsUrl, config);
      return response.data; 
    } catch (error) {
      console.error('Error getting concepts:', error);
      throw error;
    }
  }

  public async createConcept(concept: Concept): Promise<string> {
    try {
      const config = await this.getRequestConfig();
      const response = await axios.post(conceptsUrl, concept, config);
      return response.data.id; 
    } catch (error) {
      console.error('Error creating concept:', error);
      throw error;
    }
  }

  public async updateConcept(concept: Concept): Promise<string> {
    try {
      const config = await this.getRequestConfig();
      const response = await axios.put(`${conceptsUrl}?id=${concept.id}`, concept, config);
      return response.data.id; 
    } catch (error) {
      console.error('Error updating concept:', error);
      throw error;
    }
  }

  public async deleteConcept(conceptId: string): Promise<string> {
    try {
      const config = await this.getRequestConfig();
      const response = await axios.delete(`${conceptsUrl}?id=${conceptId}`, config);
      return response.data.id; 
    } catch (error) {
      console.error('Error deleting concept:', error);
      throw error;
    }
  }
}
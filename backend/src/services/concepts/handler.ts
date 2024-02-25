import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postConcepts } from "./PostConcepts";
import { getConcepts } from "./GetConcepts";
import { updateConcepts } from "./UpdateConcepts";
import { deleteConcepts } from "./DeleteConcepts";
import { MissingFieldError } from "../shared/Validator";
import { addCorsHeader } from "../shared/Utils";

// to reuse this connection, keep outside handler
const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

  let response: APIGatewayProxyResult;

  try{
    switch (event.httpMethod) {
      case 'GET':
        const getResponse = await getConcepts(event, ddbClient);
        response = getResponse;
        break;
      case 'POST':
        const postResponse = await postConcepts(event, ddbClient);
        response = postResponse;
        break;
      case 'PUT':
        const putResponse = await updateConcepts(event, ddbClient);
        response = putResponse;
        break;
      case 'DELETE':
        const deleteResponse = await deleteConcepts(event, ddbClient);
        response = deleteResponse;
        break;
      default: 
        break;
    }
  } catch (error) {
    console.error(error);
    if (error instanceof MissingFieldError) {
      response = {
          statusCode: 400,
          body: error.message
      }
    }
    response = {
      statusCode: 500,
      body: error.message
    }
  }
  addCorsHeader(response)
  return response;
}

export {handler}
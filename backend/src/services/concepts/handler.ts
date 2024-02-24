import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postConcepts } from "./PostConcepts";
import { getConcepts } from "./GetConcepts";
import { updateConcepts } from "./UpdateConcepts";
import { deleteConcepts } from "./DeleteConcepts";

// to reuse this connection, keep outside handler
const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

  let message: string;

  try{
    switch (event.httpMethod) {
      case 'GET':
        const getResponse = await getConcepts(event, ddbClient);
        console.log(getResponse);
        return getResponse;
      case 'POST':
        const postResponse = await postConcepts(event, ddbClient);
        return postResponse;
      case 'PUT':
        const putResponse = await updateConcepts(event, ddbClient);
        console.log(putResponse);
        return putResponse;
      case 'DELETE':
        const deleteResponse = await deleteConcepts(event, ddbClient);
        console.log(deleteResponse);
        return deleteResponse;
      default: 
        break;
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message)
  }

  return response;
}

export {handler}
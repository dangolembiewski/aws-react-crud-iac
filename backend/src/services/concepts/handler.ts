import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postConcepts } from "./PostConcepts";
import { getConcepts } from "./GetConcepts";

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
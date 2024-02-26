import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { hasAdminGroup } from "../shared/Utils";

export async function deleteConcepts(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  if (!hasAdminGroup(event)) {
    return {
        statusCode: 401,
        body: JSON.stringify(`Not authorized!`)
    }
  }

  if(event.queryStringParameters && ('id' in event.queryStringParameters)){
    const conceptId = event.queryStringParameters['id'];

    await ddbClient.send(new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        'id': {S: conceptId}
      },
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(`Deleted space with id ${conceptId}`)
    }

  }
  return {
    statusCode: 400,
    body:JSON.stringify('Please provide right args')
  }

      
}
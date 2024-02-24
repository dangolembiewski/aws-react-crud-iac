import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from "uuid";

export async function updateConcepts(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  if(event.queryStringParameters && ('id' in event.queryStringParameters) && event.body){
    const parsedBody = JSON.parse(event.body);
    const conceptId = event.queryStringParameters['id'];
    // key to update in the db
    const requestBodyKey = Object.keys(parsedBody)[0];
    // value to update
    const requestBodyValue = parsedBody[requestBodyKey];

    const updateResult = await ddbClient.send(new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        'id': {S: conceptId}
      },
      // specify what to update
      UpdateExpression: 'set #zzzNew = :new',
      ExpressionAttributeValues: {
        ':new': {
          S: requestBodyValue
        }
      },
      ExpressionAttributeNames: {
        '#zzzNew': requestBodyKey
      },
      ReturnValues: 'UPDATED_NEW'
    }));

    return {
      statusCode: 204,
      body: JSON.stringify(updateResult.Attributes)
    }

  }
  return {
    statusCode: 400,
    body:JSON.stringify('Please provide right args')
  }

      
}
import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from "uuid";

export async function getConcepts(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  // Check the validity of the query params
  if(event.queryStringParameters){
    if ('id' in event.queryStringParameters) {
      const conceptId = event.queryStringParameters['id'];
      const getItemResponse = await ddbClient.send(new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          'id': {S: conceptId}
        }
      }))
      if (getItemResponse.Item){
        return {
          statusCode: 200,
          body: JSON.stringify(getItemResponse.Item)
        }
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify(`Concept with id ${conceptId} not found`)
        }
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify('Id required!')
      }
    }
  }


  const result = await ddbClient.send(new ScanCommand({
    // get table name from lambda ENVIRONMENT
    TableName: process.env.TABLE_NAME,
  }));
  console.log(result.Items);

  return {
    statusCode: 201, //created
    body: JSON.stringify(result.Items)
  }
}
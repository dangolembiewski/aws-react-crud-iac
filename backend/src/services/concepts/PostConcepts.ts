import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"
import { v4 } from "uuid";

export async function postConcepts(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  // converts JavaScript objects to DynamoDB's native JSON format (marshalling)
  const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

  const randomId = v4();
  const item = JSON.parse(event.body);

  const result = await ddbDocClient.send(new PutItemCommand({
    // get table name from lambda ENVIRONMENT
    TableName: process.env.TABLE_NAME,
    Item: item
  }));
  console.log(result);

  return {
    statusCode: 201, //created
    body: JSON.stringify({id: randomId})
  }
}
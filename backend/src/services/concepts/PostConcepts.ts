import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from "uuid";

export async function postConcepts(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  const randomId = v4();
  const item = JSON.parse(event.body);

  const result = await ddbClient.send(new PutItemCommand({
    // get table name from lambda ENVIRONMENT
    TableName: process.env.TABLE_NAME,
    Item: {
      // check partitionKey in dataStack... id of type string
      id: {
        S: randomId
      },
      location: {
        S: item.location
      }
    }
  }));
  console.log(result);

  return {
    statusCode: 201, //created
    body: JSON.stringify({id: randomId})
  }
}
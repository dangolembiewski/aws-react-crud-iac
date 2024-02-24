import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from "uuid";
import { marshall } from "@aws-sdk/util-dynamodb";
import { validateAsConceptEntry } from "../shared/Validator";

export async function postConcepts(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  // TODO: this is supposed to marshall for me but its not working
  //const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

  const randomId = v4();
  const item = JSON.parse(event.body);
  item.id = randomId;
  validateAsConceptEntry(item);

  const result = await ddbClient.send(new PutItemCommand({
    // get table name from lambda ENVIRONMENT
    TableName: process.env.TABLE_NAME,
    Item: marshall(item)
  }));
  console.log(result);

  return {
    statusCode: 201, //created
    body: JSON.stringify({id: randomId})
  }
}
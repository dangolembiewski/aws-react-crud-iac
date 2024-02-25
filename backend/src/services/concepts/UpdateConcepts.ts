import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand, UpdateItemCommand, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from "uuid";

export async function updateConcepts(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  if(event.queryStringParameters && ('id' in event.queryStringParameters) && event.body){
    const body = JSON.parse(event.body);
    const id = event.queryStringParameters.id;

    const params: UpdateItemCommandInput = {
        TableName: process.env.TABLE_NAME, 
        Key: {
            "id": { S: id } 
        },
        UpdateExpression: "SET description = :description, displayName = :displayName, parentIds = :parentIds, childIds = :childIds, alternateNames = :alternateNames",
        ExpressionAttributeValues: {
            ":description": { S: body.description },
            ":displayName": { S: body.displayName },
            ":parentIds": { NS: body.parentIds },
            ":childIds": { NS: body.childIds },
            ":alternateNames": { SS: body.alternateNames }
        }
    };

    const data = await ddbClient.send(new UpdateItemCommand(params));

    console.log(data.Attributes);

    return {
      statusCode: 201,
      body: JSON.stringify(data.Attributes)
    }

  }
  return {
    statusCode: 400,
    body:JSON.stringify('Please provide right args')
  }

      
}
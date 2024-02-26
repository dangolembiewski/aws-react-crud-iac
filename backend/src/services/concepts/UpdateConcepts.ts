import { DynamoDBClient, UpdateItemCommand, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function updateConcepts(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  if(event.queryStringParameters && ('id' in event.queryStringParameters) && event.body){
    const body = JSON.parse(event.body);
    const id = event.queryStringParameters.id;

    if (!body.displayName || body.displayName.trim() === '') {
      return {
        statusCode: 400,
        body: JSON.stringify('displayName cannot be null or empty')
      };
    }

    const params: UpdateItemCommandInput = {
        TableName: process.env.TABLE_NAME, 
        Key: {
            "id": { S: id } 
        },
        UpdateExpression: "SET description = :description, displayName = :displayName, parentIds = :parentIds, childIds = :childIds, alternateNames = :alternateNames",
        ExpressionAttributeValues: {
          ":description": body.description !== undefined && body.description !== '' ? { S: body.description } : { NULL: true },
          ":displayName": { S: body.displayName },
          ":parentIds": body.parentIds && body.parentIds.length > 0 ? { SS: body.parentIds } : { NULL: true },
          ":childIds": body.childIds && body.childIds.length > 0 ? { SS: body.childIds } : { NULL: true },
          ":alternateNames": body.alternateNames && body.alternateNames.length > 0 ? { SS: body.alternateNames } : { NULL: true }
        }
    };

    const data = await ddbClient.send(new UpdateItemCommand(params));

    console.log(data);

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
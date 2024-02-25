import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

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
        const unmarshalledItem = unmarshall(getItemResponse.Item)
        // Convert Sets to Arrays
        unmarshalledItem.parentIds = Array.from(unmarshalledItem.parentIds);
        unmarshalledItem.childIds = Array.from(unmarshalledItem.childIds);
        unmarshalledItem.alternateNames = Array.from(unmarshalledItem.alternateNames);
        return {
          statusCode: 200,
          body: JSON.stringify(unmarshalledItem)
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
  const unmarshalledItems = result.Items?.map(item => {
    const unmarshalledItem = unmarshall(item);
    // Convert Sets to Arrays
    unmarshalledItem.parentIds = Array.from(unmarshalledItem.parentIds);
    unmarshalledItem.childIds = Array.from(unmarshalledItem.childIds);
    unmarshalledItem.alternateNames = Array.from(unmarshalledItem.alternateNames);
    return unmarshalledItem;
  });
  console.log(unmarshalledItems);

  return {
    statusCode: 201, //created
    body: JSON.stringify(unmarshalledItems)
  }
}

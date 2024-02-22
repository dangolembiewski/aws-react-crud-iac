import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: "us-west-1" }); 
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDBClient);

async function getConcepts() {
  try {
    const params = {
      TableName: "Concepts", 
    };

    const data = await ddbDocClient.send(new ScanCommand(params));

    return data.Items;

  } catch (error) {
    console.error("Error fetching concepts from DynamoDB:", error);
    throw error;
  }
}

export { getConcepts };
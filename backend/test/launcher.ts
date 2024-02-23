import { handler } from "../src/services/concepts/handler";

// so that i can run with ts-node
process.env.AWS_REGION = "us-east-1"
process.env.TABLE_NAME = "ConceptsTable-0e78e5957741"

handler({
  httpMethod: 'GET',
  queryStringParameters: {
    id: 'cd9c885a-ec24-4861-93ce-a3bbbe547279'
  }
  // body: JSON.stringify({
  //   location: 'Athens'
  // })
} as any,{} as any);
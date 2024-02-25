import { handler } from "../src/services/concepts/handler";

// so that I can run with ts-node
process.env.AWS_REGION = "us-east-1"
process.env.TABLE_NAME = "ConceptsTable-0e78e5957741"

handler({
  httpMethod: 'PUT',
  queryStringParameters: { id: "4cb5a4e3-2e6d-4aa7-8bf4-ad7b682e44ec" },
  body: JSON.stringify({  
    description: '',
    displayName: null,
    parentIds: null, 
    childIds: null,
    alternateNames: null,
  })
} as any, {} as any);

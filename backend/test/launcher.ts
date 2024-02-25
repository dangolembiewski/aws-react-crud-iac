import { handler } from "../src/services/concepts/handler";

// so that I can run with ts-node
process.env.AWS_REGION = "us-east-1"
process.env.TABLE_NAME = "ConceptsTable-0e78e5957741"

handler({
  httpMethod: 'POST',
  body: JSON.stringify({
      description: 'hello',
  })
} as any, {} as any);

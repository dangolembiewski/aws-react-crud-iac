import { handler } from "../src/services/concepts/handler";

// so that I can run with ts-node
process.env.AWS_REGION = "us-east-1"
process.env.TABLE_NAME = "ConceptsTable-0e78e5957741"

handler({
  httpMethod: 'PUT',
  queryStringParameters: { id: "4cbc953b-c3d4-4797-b01c-15309b406053" },
  body: JSON.stringify({  
    description: 'YTREWQ',
    displayName: 'QWERTY',
    parentIds: ["5","1","6"], 
    childIds: ["0","2","5"],
    alternateNames: ["FGHJK", "lkjhgfd"]
  })
} as any, {} as any);

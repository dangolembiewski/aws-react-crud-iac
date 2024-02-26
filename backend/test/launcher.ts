import { handler } from "../src/services/concepts/handler";

// so that I can run with ts-node
process.env.AWS_REGION = "us-east-1"
process.env.TABLE_NAME = "ConceptsTable-0e78e5957741"

// handler({
//   httpMethod: 'PUT',
//   queryStringParameters: {
//       id: '479a48b1-6897-4b57-9872-6bce681b3021'
//   },
//   body: JSON.stringify({
//     displayName: 'Update',
//     description: 'Update',
//     parentIds: [],
//     childIds: null,
//     alternateNames: []
// })
// } as any, {} as any);

handler({
  httpMethod: 'GET',
} as any, {} as any);

// handler({
//     httpMethod: 'POST',
//     body: JSON.stringify({
//       displayName: "Glaucoma",
//       description: "eyes",
//       parentIds: ["1", "4", "5", "6"],
//       childIds: ["2", "3", "1"],
//       alternateNames: ["Glaucoma1", "Glaucoma2"]
// })
// } as any, {} as any);
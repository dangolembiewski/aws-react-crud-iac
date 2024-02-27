Added config-overrides.js and changed start script to be able to use ouputs file from backend

AWS Services:
- Api Gateway
- lambda
- cognito. AWS Identity pools/federated identities  (explain why)
- dynamoDb
- s3 for hosting
- 

TODO:
- optimized error handling and messages to user
- pagination and lazy loading
- write tests
- be consistent on stlying. no longer supporting MakeStyle
- handle duplicate concept names
- edge cases
- maybe a tree structure to represent parent child relationship
- state management with redux
- use a map of concepts with id as key for state
- be consistent with function syntax
- detect session expired in the errors? refresh token

Phase 2:
- Set up CI/CD
- Write Tests
- Implement a load csv service to upload into dynamoDB 
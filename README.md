# Introduction:
This is an application to manage CRUD operations of entries in a dynamoDb database. Admin users have authorization to add, edit and delete. Employee users may only view the data.

# Access the application
https://dm3a8j7y9uzlh.cloudfront.net/
Test Accounts:
- username: admin  |  password: @Admin(ontology)1
- username: employee  |  password: @Employee()1

# AWS Services Utilized:
- Api Gateway
- lambda
- Cognito
- dynamoDb
- s3 and Cloudfront for hosting
- Amplify and AWS SDK for web app

# Tech Stack:
## Frontend:
  - Typescript & React
  - Material UI for style
  - Amplify v6 for Managing Auth

## Backend:
  - IaC (infrastructure as Code)
    - CDK and Typescript to provision AWS services
  - Typescript services for CRUD. Exposed via API gateway





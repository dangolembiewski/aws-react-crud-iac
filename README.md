# Introduction:
This is a Proof of Concept application to manage CRUD operations of entries in a dynamoDb database. Admin users have authorization to add, edit and delete. Employee users may only view the data.

# Access the application
https://dm3a8j7y9uzlh.cloudfront.net/
Test Account for Read Only:
- username: employee  |  password: @Employee()1

As this data is shared across all users, admin credentials with full acces to CRUD operations are provided by the application owner when necessary. 

# AWS Services Utilized:
- Api Gateway (Proxy Requests)
- lambda (Serverless Computing)
- Cognito (Auth)
- dynamoDb (Data Storage)
- s3 (for hosting)
- Cloudfront (CDN)
- Amplify and AWS SDK (Web app to use aws services and Auth)

# Tech Stack:
## Frontend:
  - Typescript & React
  - Material UI for style
  - Amplify v6 for Managing Auth

## Backend:
  - IaC (infrastructure as Code)
    - CDK and Typescript to provision AWS services
  - Typescript services for CRUD. Exposed via API gateway





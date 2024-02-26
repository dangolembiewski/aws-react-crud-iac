import { Stack, StackProps } from "aws-cdk-lib";
import { AuthorizationType, CognitoUserPoolsAuthorizer, Cors, LambdaIntegration, MethodOptions, ResourceOptions, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  conceptsLambdaIntegration: LambdaIntegration,
  userPool: IUserPool
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps){
    super(scope, id, props);
    const api = new RestApi(this, 'ConceptsApi');

    // create user pool authorizer
    const authorizer = new CognitoUserPoolsAuthorizer(this, 'ConceptsApiAuthorizer', {
      cognitoUserPools:[props.userPool],
      identitySource: 'method.request.header.Authorization'
    });
    authorizer._attachToApi(api);

    const optionsWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
          authorizerId: authorizer.authorizerId
      }
  }

    const optionsWithCors: ResourceOptions = {
      defaultCorsPreflightOptions: {
          allowOrigins: Cors.ALL_ORIGINS,
          allowMethods: Cors.ALL_METHODS
      }
    }

    const conceptsResource = api.root.addResource('concepts', optionsWithCors);
    conceptsResource.addMethod('GET' ,props.conceptsLambdaIntegration, optionsWithAuth)
    conceptsResource.addMethod('POST' ,props.conceptsLambdaIntegration, optionsWithAuth)
    conceptsResource.addMethod('PUT', props.conceptsLambdaIntegration, optionsWithAuth);
    conceptsResource.addMethod('DELETE', props.conceptsLambdaIntegration, optionsWithAuth);
  }
}
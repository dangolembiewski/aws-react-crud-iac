import { Stack, StackProps } from "aws-cdk-lib";
import { Cors, LambdaIntegration, ResourceOptions, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  conceptsLambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps){
    super(scope, id, props);
    const api = new RestApi(this, 'ConceptsApi');

    const optionsWithCors: ResourceOptions = {
      defaultCorsPreflightOptions: {
          allowOrigins: Cors.ALL_ORIGINS,
          allowMethods: Cors.ALL_METHODS
      }
    }

    const conceptsResource = api.root.addResource('concepts', optionsWithCors);
    conceptsResource.addMethod('GET' ,props.conceptsLambdaIntegration)
    conceptsResource.addMethod('POST' ,props.conceptsLambdaIntegration)
    conceptsResource.addMethod('PUT', props.conceptsLambdaIntegration);
    conceptsResource.addMethod('DELETE', props.conceptsLambdaIntegration);
  }
}
import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  conceptsLambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps){
    super(scope, id, props);
    const api = new RestApi(this, 'ConceptsApi');
    const conceptsResource = api.root.addResource('concepts');
    conceptsResource.addMethod('GET' ,props.conceptsLambdaIntegration)
    conceptsResource.addMethod('POST' ,props.conceptsLambdaIntegration)
  }
}
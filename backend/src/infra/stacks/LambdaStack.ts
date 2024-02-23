import {Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

interface LambdaStackProps extends StackProps {
  conceptsTable: ITable
}

export class LambdaStack extends Stack {

  public readonly conceptsLambdaIntegration: LambdaIntegration

  constructor(scope: Construct, id: string, props:LambdaStackProps){
    super(scope,id,props)

    const conceptsLambda = new NodejsFunction(this, 'ConceptsLambda', {
      runtime: Runtime.NODEJS_LATEST,
      handler: 'handler',
      entry: (join(__dirname, '..','..', 'services', 'concepts' ,'handler.ts')),
      environment: {
          TABLE_NAME: props.conceptsTable.tableName
      }
    }) 

    this.conceptsLambdaIntegration = new LambdaIntegration(conceptsLambda)
  }
}

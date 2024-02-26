import {App} from "aws-cdk-lib"
import { DataStack } from "./stacks/DataStack"
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { UiDeploymentStack } from "./stacks/UiDeploymentStack";
import { AuthStack } from "./stacks/AuthStack";

const app = new App();
const dataStack = new DataStack(app, 'DataStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  conceptsTable: dataStack.conceptsTable,
});

const authStack = new AuthStack(app, 'AuthStack');

new ApiStack(app, "ApiStack", {
  conceptsLambdaIntegration: lambdaStack.conceptsLambdaIntegration,
  userPool: authStack.userPool
});
new UiDeploymentStack(app, 'UiDeploymentStack');

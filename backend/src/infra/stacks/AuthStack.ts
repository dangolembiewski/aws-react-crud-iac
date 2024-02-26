import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib'
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class AuthStack extends Stack {

    // user directory that manages user registration, authentication, and account recovery
    private userPool: UserPool;

    // represents an application that interacts with the User Pool
    private userPoolClient: UserPoolClient;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.createUserPool();
        this.createUserPoolClient();
    }

    private createUserPool(){
        this.userPool = new UserPool(this, 'ConceptsUserPool', {
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true
            }
        });
        new CfnOutput(this, 'ConceptsUserPoolId', {
            value: this.userPool.userPoolId
        })
    }
    private createUserPoolClient(){
        this.userPoolClient = this.userPool.addClient('ConceptsUserPoolClient', {
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            }
        });
        new CfnOutput(this, 'ConceptsUserPoolClientId', {
            value: this.userPoolClient.userPoolClientId
        })
    }
}
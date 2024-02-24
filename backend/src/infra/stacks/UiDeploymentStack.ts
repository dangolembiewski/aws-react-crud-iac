import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { OriginAccessIdentity, Distribution } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { existsSync } from "fs";
import { join } from "path";

/**
 * Deploy the ui to aws
 * reference aws docs: https://aws-cdk.com/deploying-a-static-website-using-s3-and-cloudfront
 */

export class UiDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope,id,props);

    const deploymentBucket = new Bucket(this, 'UiDeploymentBucket', {
      bucketName: 'concepts-front-end'
    })
    
    const uiDir = join(__dirname, '..', '..', '..', '..', 'ui', 'build');

    //make sure it exists to avoid errors deploying
    if (!existsSync(uiDir)) {
        console.warn('Ui dir not found: ' + uiDir);
        return;
    }
    
    new BucketDeployment(this, 'ConceptsFinderDeployment', {
      destinationBucket: deploymentBucket,
      sources: [Source.asset(uiDir)]
    });

    const originIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
    deploymentBucket.grantRead(originIdentity);

    const distribution = new Distribution(this, 'ConceptsFinderDistribution', {
        defaultRootObject: 'index.html',
        defaultBehavior: {
            origin: new S3Origin(deploymentBucket, {
                originAccessIdentity: originIdentity
            })
        }
    });
    new CfnOutput(this, 'ConceptsUrl', {
      value: distribution.distributionDomainName
    })
    
  }

}
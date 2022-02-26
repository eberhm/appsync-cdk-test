import * as cdk from '@aws-cdk/core';
import { Stack, StackProps } from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';

export class AppsyncCdkAppStack extends Stack {
  constructor(scope: cdk.Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Creates the AppSync API
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-test-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        },
      },
      xrayEnabled: true,
    });

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
     value: api.graphqlUrl
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || ''
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region
    });
  }
}

import { SignInOutput, signIn } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: 'us-east-1_IwzleIjx0',
        userPoolClientId: '2gmg2vjeof16bbsjosp9knp2ln'
      }
    }
});

export class AuthService {
  public async login(username: string, password: string) {
    const result = (await signIn({
      username,
      password,
      options: {
        authFlowType: 'USER_PASSWORD_AUTH',
      },
    })) as SignInOutput;
    return result;
  }
}
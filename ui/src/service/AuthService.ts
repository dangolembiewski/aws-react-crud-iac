import { SignInOutput, fetchAuthSession, signIn, signOut } from '@aws-amplify/auth';
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

  public isSignedIn: boolean = false;
  private JwtToken: string | undefined;

  public async login(username: string, password: string) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      this.isSignedIn = isSignedIn;
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      this.JwtToken = idToken?.toString();
      console.log(this.JwtToken);
    } catch (error) {
      throw error;
    }
  }

  public async logout() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
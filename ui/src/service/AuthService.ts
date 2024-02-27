import { SignInOutput, fetchAuthSession, getCurrentUser, signIn, signOut } from '@aws-amplify/auth';
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

  public async currentAuthenticatedUser(): Promise<string | undefined> {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      return username;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  public getJwtToken(): string | undefined {
    return this.JwtToken;
  }

  public async refreshToken() {
    try {

    } catch (err) {
      console.log(err);
    }
  }

  public async currentSession() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession({forceRefresh: true})).tokens ?? {};
    } catch (err) {
      console.log(err);
    }
  }

  public async login(username: string, password: string) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      const { idToken } = (await fetchAuthSession({forceRefresh: true})).tokens ?? {};
      this.JwtToken = idToken?.toString();
    } catch (error) {
      throw error;
    }
  }

  public async logout() {
    try {
      await signOut();
      this.JwtToken = undefined;
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
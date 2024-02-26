import { fetchAuthSession } from '@aws-amplify/auth';
import { AuthService } from './AuthService';
 
async function testAuth() {
  const service = new AuthService();

  const loginResult = await service.login('Dan', '@Borte18');

  const { idToken } = (await fetchAuthSession()).tokens ?? {};
 
  console.log(idToken?.toString());
 
  return idToken;
}
 
testAuth();
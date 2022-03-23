import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import {
  ModuleOptions,
  PasswordTokenConfig,
  ResourceOwnerPassword,
} from 'simple-oauth2';
import type { Token } from 'simple-oauth2';
import { sessionStorage } from './session.server';

const options: ModuleOptions = {
  client: {
    id: String(process.env.CLIENT_ID),
    secret: String(process.env.CLIENT_SECRET),
  },
  auth: {
    tokenHost: String(process.env.IRIDA_URL),
    tokenPath: `/api/oauth/token`,
  },
};

const authenticator = new Authenticator<Token | Error | null>(sessionStorage, {
  sessionKey: 'sessionKey', // keep in sync
  sessionErrorKey: 'sessionErrorKey', // keep in sync
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    // get the data from the form...
    const username = form.get('username') as string;
    const password = form.get('password') as string;

    // do some validation, errors are in the sessionErrorKey
    if (!username || username?.length === 0)
      throw new AuthorizationError('Bad Credentials: Username is required');
    if (typeof username !== 'string')
      throw new AuthorizationError(
        'Bad Credentials: Username must be a string',
      );

    if (!password || password?.length === 0)
      throw new AuthorizationError('Bad Credentials: Password is required');
    if (typeof password !== 'string')
      throw new AuthorizationError(
        'Bad Credentials: Password must be a string',
      );

    const client = new ResourceOwnerPassword(options);

    const tokenConfig: PasswordTokenConfig = {
      username,
      password,
      scope: `read write`,
    };

    const { token } = await client.getToken(tokenConfig);
    console.log(token);

    if (token) {
      return await Promise.resolve({ ...token });
    } else {
      throw new AuthorizationError('Bad Credentials');
    }
  }),
);

export default authenticator;

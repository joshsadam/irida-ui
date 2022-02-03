import { Authenticator } from 'remix-auth';
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

export const authenticator = new Authenticator<Token>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get('username');
    const password = form.get('password');
    console.log({ options });
    const client = new ResourceOwnerPassword(options);

    const tokenConfig: PasswordTokenConfig = {
      username,
      password,
      scope: `read write`,
    };

    const { token } = await client.getToken(tokenConfig);
    console.log({ token });

    return token;
  }),
);

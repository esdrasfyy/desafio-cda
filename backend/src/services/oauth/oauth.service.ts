import { Injectable } from '@nestjs/common';
import {
  GithubTokensResult,
  GithubUserResult,
  GoogleTokensResult,
  GoogleUserResult,
} from './types/oauth.service';
import axios from 'axios';

@Injectable()
export class OAuthService {
  private githubClientId = process.env.GITHUB_CLIENT_ID;
  private githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  private googleClientId = process.env.GOOGLE_CLIENT_ID;
  private googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  private baseUrl = process.env.BASE_URL;


  async oAuthGithub(code: string): Promise<GithubUserResult> {
    try {
      const accessToken = await this.GetGithubOAuthTokens({ code });
      if (!accessToken) {
        throw new Error('Failed to retrieve GitHub access token');
      }

      const user = await this.GetGithubUser({ accessToken });
      if (!user) {
        throw new Error('Failed to retrieve GitHub user');
      }
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async oAuthGoogle(code: string): Promise<GoogleUserResult> {
    try {
      const { access_token, id_token } = await this.GetGoogleOAuthToken({
        code,
      });
      if (!access_token || !id_token) {
        throw new Error('Failed to retrieve GitHub access token');
      }

      const user = await this.GetGoogleUser({ access_token, id_token });
      if (!user) {
        throw new Error('Failed to retrieve GitHub user');
      }
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async GetGithubOAuthTokens({
    code,
  }: {
    code: string;
  }): Promise<string | null> {
    try {
      const res: GithubTokensResult = (
        await axios.post<GithubTokensResult>(
          'https://github.com/login/oauth/access_token',
          {
            client_id: this.githubClientId,
            client_secret: this.githubClientSecret,
            code: code,
          },
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
      ).data;

      return res.access_token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async GetGithubUser({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<GithubUserResult | null> {
    const url = 'https://api.github.com/user';

    try {
      const res = await axios.get<GithubUserResult>(url, {
        headers: {
          Authorization: `token ${accessToken}`,
          'User-Agent': 'node.js',
        },
      });

      return res.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  private async GetGoogleOAuthToken({
    code,
  }: {
    code: string;
  }): Promise<GoogleTokensResult | null> {
    const redirect_uri = `http://localhost:8080/auth/google` as string;

    const url = 'https:oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: this.googleClientId,
      client_secret: this.googleClientSecret,
      redirect_uri: 'http://localhost:8080/oauth/google',
      grant_type: 'authorization_code',
    };

    const params = new URLSearchParams(values);
    try {
      const res = await axios.post<GoogleTokensResult>(url, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return res.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  private async GetGoogleUser({
    id_token,
    access_token,
  }: {
    id_token: string;
    access_token: string;
  }): Promise<GoogleUserResult> {
    try {
      const res = await axios.get<GoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      );
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

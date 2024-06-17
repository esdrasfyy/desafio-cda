import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { sign } from 'jsonwebtoken';
import { UserI } from 'src/entities/user.entitie';
import { prisma } from 'src/services/database/database.service';
import { OAuthService } from 'src/services/oauth/oauth.service';

@Controller('/oauth')
export class OAuthController {
  private frontBaseUrl = process.env.FRONT_BASE_URL as string;
  private secret = process.env.SECRET as string;
  constructor(private readonly oAuthGithubService: OAuthService) {}

  @Get('/github')
  async oAuthGithub(
    @Query() query: any,
    @Res() res: ExpressResponse,
  ): Promise<void> {
    const code = query.code;
    if (!code) {
      throw new Error('Dont have a code');
    }
    try {
      const { avatar_url, id, name } =
        await this.oAuthGithubService.oAuthGithub(code);

      const existingUser = await prisma.user.findFirst({
        where: {
          github_id: String(id),
        },
        include: {
          UserEmblems: {
            include: {
              emblem: true,
            },
          },
        },
      });

      const user =
        existingUser ||
        (await prisma.user.create({
          data: {
            avatar: avatar_url,
            github_id: String(id),
            fullname: name,
            username: `user${Math.floor(1000 + Math.random() * 9000)}`,
          },
          include: {
            UserEmblems: {
              include: {
                emblem: true,
              },
            },
          },
        }));

      const token = sign(
        {
          ...user,
          emblems: user.UserEmblems.map((ue) => ue.emblem) || [],
          points:
            user.UserEmblems.reduce((acc, cur) => acc + cur.emblem.value, 0) ||
            0,
        },
        this.secret,
        { expiresIn: '24h' },
      );

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .redirect(this.frontBaseUrl || 'http://localhost:3000');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/google')
  async oAuth(@Query() query: any, @Res() res: ExpressResponse) {
    const code = query.code;
    if (!code) {
      throw new Error('OAuth code is missing.');
    }

    try {
      const { id, picture, name } =
        await this.oAuthGithubService.oAuthGoogle(code);

      const existingUser = await prisma.user.findFirst({
        where: {
          google_id: String(id),
        },
        include: {
          UserEmblems: {
            include: {
              emblem: true,
            },
          },
        },
      });

      const user =
        existingUser ||
        (await prisma.user.create({
          data: {
            avatar: picture,
            google_id: String(id),
            fullname: name,
            username: `user${Math.floor(1000 + Math.random() * 9000)}`,
          },
          include: {
            UserEmblems: {
              include: {
                emblem: true,
              },
            },
          },
        }));

      const token = sign(
        {
          ...user,
          emblems: user.UserEmblems.map((ue) => ue.emblem) || [],
          points:
            user.UserEmblems.reduce((acc, cur) => acc + cur.emblem.value, 0) ||
            0,
        },
        this.secret,
        { expiresIn: '24h' },
      );

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .redirect(this.frontBaseUrl || 'http://localhost:3000');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

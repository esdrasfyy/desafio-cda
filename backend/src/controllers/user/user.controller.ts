import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { VerifyErrors, sign, verify } from 'jsonwebtoken';
import { prisma } from 'src/services/database/database.service';
import { MailerService } from 'src/services/mailer/mailer.controller';
import { RankingService } from 'src/services/ranking/ranking.service';
import { HtmlUserUpdate } from 'src/utils/html/update-user/html-update-user.utils';
import { regexEmail } from 'src/utils/regex/regex.util';

@Controller('/user')
export class UserController {
  private secret = process.env.SECRET as string;

  constructor(
    private readonly rankingService: RankingService,
    private readonly mailer: MailerService,
  ) {}

  @Post('/gift')
  async GiftUser(
    @Res() res: ExpressResponse,
    @Req() req: ExpressRequest,
  ): Promise<void> {
    const cookie = req.cookies.token;

    try {
      const decoded: any = await new Promise((resolve, reject) => {
        verify(
          cookie,
          this.secret,
          (err: VerifyErrors | null, decoded: any) => {
            if (err) reject(err);
            resolve(decoded);
          },
        );
      });

      const emblem = await this.rankingService.getRandomEmblemToUser({
        id: decoded.id,
        emblems: decoded.emblems,
      });
      delete decoded.exp;
      decoded.emblems.push(emblem);
      decoded.points += emblem.value;

      const token = sign(decoded, this.secret, {
        expiresIn: '24h',
      });

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(HttpStatus.OK)
        .json({ emblem });
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error.message || 'Ocorreu um erro interno.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Put('/update')
  async UpdateUser(@Res() res: ExpressResponse, @Req() req: ExpressRequest) {
    const code = req.cookies.code;
    const token = req.cookies.token;
    const data = req.body.data;
    try {
      const decoded: any = verify(
        token,
        this.secret,
        (err: VerifyErrors | null, decoded: any) => {
          if (err) {
            res.cookie('token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
              maxAge: 0,
            });
            throw new Error('Login expirado.');
          }
          return decoded;
        },
      );

      if (!code) {
        if (!regexEmail.test(data.email)) {
          console.log(data);

          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: 'Formato de email incorreto.' });
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ username: data?.username }, { email: data.email }],
          },
        });

        if (existingUser) {
          if (
            existingUser.email === data.email &&
            decoded.email !== existingUser.email
          ) {
            return res
              .status(HttpStatus.CONFLICT)
              .json({ message: 'Este email já está sendo usado.' });
          }

          if (
            existingUser.username === data.username &&
            decoded.username !== existingUser.username
          ) {
            return res
              .status(HttpStatus.CONFLICT)
              .json({ message: 'Este username já está sendo usado.' });
          }
        }

        const value = Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, '0');

        const html = new HtmlUserUpdate().generateHtml(value);
        await this.mailer.Send({ html, email: data.email });

        res.cookie(
          'code',
          { value, data },
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
          },
        );
        return res
          .status(HttpStatus.CREATED)
          .json({ message: 'Código de verificação enviado.' });
      }
      const html = new HtmlUserUpdate().generateHtml(code.value);
      await this.mailer.Send({ html, email: code.data.email });

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Código de verificação reenviado.' });
    } catch (error) {
      console.log(error);

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro no servidor.' });
    }
  }
  @Get('/update')
  async UpdatedUser(@Res() res: ExpressResponse, @Req() req: ExpressRequest) {
    const data = req.cookies.code;
    const code = req.query;

    if (!code) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'É necessário um código' });
    }

    if (!data) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Código expirado.' });
    }
    return res.status(HttpStatus.CREATED).json({ data, code });
  }
}

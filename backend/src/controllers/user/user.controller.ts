import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { VerifyErrors, sign, verify } from 'jsonwebtoken';
import { RankingService } from 'src/services/ranking/ranking.service';

@Controller('/user')
export class UserController {
  private secret = process.env.SECRET as string;

  constructor(private readonly rankingService: RankingService) {}

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
}

import {
  Body,
  Controller,
  Get,
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
import { prisma } from 'src/services/database/database.service';
import { compare } from 'bcrypt';
import { VerifyErrors, sign, verify } from 'jsonwebtoken';

@Controller('login')
export class LoginController {
  private secret = process.env.SECRET as string;

  @Post()
  async Login(@Res() res: ExpressResponse, @Body() body: any): Promise<void> {
    const { credential, password } = body;
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email: credential }, { username: credential }],
        },
      });

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }

      const isValidPassword = await compare(password, user.password);
      if (!isValidPassword) {
        throw new HttpException('Senha incorreta.', HttpStatus.UNAUTHORIZED);
      }

      const token = sign(user, this.secret, { expiresIn: '24h' });

      res
        .status(HttpStatus.OK)
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ token });
    } catch (error) {
      throw new HttpException(
        error.message || 'Ocorreu um erro interno.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async Authenticate(
    @Res() res: ExpressResponse,
    @Req() req: ExpressRequest,
  ): Promise<void> {
    const token = req.cookies.token;
    try {
      if (!token) {
        throw new Error('Usuário deslogado.');
      }
      verify(token, this.secret, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 0,
          });
          throw new Error('Sessão expirada. Faça login novamente.');
        }
        return res.status(200).json({ token });
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Ocorreu um erro interno.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

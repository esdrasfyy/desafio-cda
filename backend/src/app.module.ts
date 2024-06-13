import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OAuthController } from './controllers/oauth/oauth.controller';
import { OAuthService } from './services/oauth/oauth.service';
import { RegisterController } from './controllers/register/register.controller';
import { RegisterService } from './services/register/register.service';
import { LoginController } from './controllers/login/login.controller';
import { AuthMiddleware } from './middlewares/auth.middlewae';

@Module({
  imports: [],
  controllers: [
    AppController,
    OAuthController,
    RegisterController,
    LoginController,
  ],
  providers: [AppService, OAuthService, RegisterService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'login', method: RequestMethod.POST });
  }
}

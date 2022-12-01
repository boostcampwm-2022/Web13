import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DataSource, IsNull } from 'typeorm';
import { JwtTokenService } from '@common/module/jwt-token/jwt-token.service';
import { TokenType } from '@common/module/jwt-token/type/token-type';
import { User } from '@app/user/entity/user.entity';
import { InvalidTokenException } from '@exception/invalid-token.exception';
import { CookieConfigService } from '@config/cookie/config.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly dataSource: DataSource,
    private readonly cookieConfigService: CookieConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { access_token, refresh_token } = request.cookies;

    try {
      if (!access_token) {
        throw new Error('엑세스 토큰이 존재하지 않습니다');
      }

      const authTokenPayload = this.jwtTokenService.verifyAuthToken(
        access_token,
        TokenType.ACCESS,
      );

      const user = await this.dataSource
        .getRepository(User)
        .findOneBy({ id: authTokenPayload.userId, deletedAt: IsNull() });

      if (!user) {
        throw new Error('유저가 존재하지 않습니다');
      }

      request.user = user;

      return true;
    } catch (e) {
      try {
        if (!refresh_token) {
          throw new Error('Not Found RefreshToken');
        }

        const authTokenPayload = this.jwtTokenService.verifyAuthToken(
          refresh_token,
          TokenType.REFRESH,
        );

        const user = await this.dataSource
          .getRepository(User)
          .findOneBy({ id: authTokenPayload.userId, deletedAt: IsNull() });

        if (!user) {
          throw new Error('Not Found User');
        }

        request.user = user;

        const { accessToken, accessTokenExpires } =
          this.jwtTokenService.generateAccessToken(user);

        response.cookie('access_token', accessToken, {
          httpOnly: true,
          expires: new Date(accessTokenExpires * 1000),
          secure: this.cookieConfigService.secure,
          sameSite: this.cookieConfigService.sameSite,
        });

        return true;
      } catch (e) {
        response.clearCookie('access_token');
        response.clearCookie('refresh_token');
        throw new InvalidTokenException(e.message);
      }
    }
  }
}

import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validadeUser(username, password);

    if (!user) throw new UnauthorizedException('Usuário e/ou Senha Inválidos');

    return user;
  }
}

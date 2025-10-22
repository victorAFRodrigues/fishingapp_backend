import {
  CanActivate,
  ExecutionContext, ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Authorization token missing or malformed');
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET_KEY,
        }
      );
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException("Token has expired");
      }

      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException("Invalid token");
      }

      throw new ForbiddenException("Access denied");
    }

    return true;
  }

  private extractTokenFromHeader(req: Request) {
    const authHeader = req.headers['authorization'];

    if (typeof authHeader !== 'string') return undefined;

    const [type, token] = authHeader.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

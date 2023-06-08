import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from "@nestjs/common"

import { UsersService } from "../users.service"

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest()

    const id = request?.session?.id

    // If (user)id exists in the session object
    if (id) {
      const user = this.usersService.findOne(id)
      request.currentUser = user
    }

    // Else, go ahead and run the route handler
    return next.handle()
  }
}

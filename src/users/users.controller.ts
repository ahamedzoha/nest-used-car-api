import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UsersService } from "./users.service"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { Serialize } from "../interceptors/serialize.interceptor"
import { UserDto } from "./dtos/user.dto"
import { AuthService } from "./auth.service"
import { CurrentUser } from "./decorators/current-user.decorator"
import { User } from "./user.entity"
import { AuthGuard } from "../guards/auth.guard"

interface AuthSession {
  id: number
}
@Serialize(UserDto)
@Controller("auth")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get("whoami")
  // whoAmI(@Session() session: AuthSession) {
  //   return this.usersService.findOne(session.id)
  // }
  @Get("whoami")
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() currentUser: User) {
    return currentUser
  }

  // @Get("/colors/:color")
  // setColor(@Param("color") color: string, @Session() session: any) {
  //   session.color = color
  // }

  // @Get("/session")
  // getSession(@Session() session: any) {
  //   return session
  // }

  @Get(":id")
  async findUser(@Param("id") id: number) {
    const user = await this.usersService.findOne(id)
    if (!user) throw new NotFoundException("User Not Found")
    return user
  }

  @Get()
  findAllUsers(@Query("email") email: string) {
    return this.usersService.find(email)
  }

  @Post("signout")
  signOut(@Session() session: AuthSession) {
    return (session.id = null)
  }

  @Post("/signup")
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password)
    session.id = user.id
    return user
  }

  @Post("/signin")
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password)
    session.id = user.id
    return user
  }

  @Patch(":id")
  updateUser(@Param("id") id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body)
  }

  @Delete(":id")
  removeUser(@Param("id") id: number) {
    return this.usersService.remove(id)
  }
}

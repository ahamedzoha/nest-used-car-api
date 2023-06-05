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
} from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UsersService } from "./users.service"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { Serialize } from "src/interceptors/serialize.interceptor"
import { UserDto } from "./dtos/user.dto"

@Serialize(UserDto)
@Controller("auth")
export class UsersController {
  constructor(private usersService: UsersService) {}

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

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password)
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

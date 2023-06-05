import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UsersService } from "./users.service"
import { UpdateUserDto } from "./dtos/update-user.dto"

@Controller("auth")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(":id")
  findUser(@Param("id") id: number) {
    return this.usersService.findOne(id)
  }

  @Get()
  findAllUsers(@Query("email") email: string) {
    return this.usersService.find(email)
  }

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password)
  }

  @Patch(":id")
  updateUser(@Param("id") id: number, @Body() body: UpdateUserDto) {
    this.usersService.update(id, body)
  }

  @Delete(":id")
  removeUser(@Param("id") id: number) {
    this.usersService.remove(id)
  }
}

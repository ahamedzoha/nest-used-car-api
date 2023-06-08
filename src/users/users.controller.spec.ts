import { Test, TestingModule } from "@nestjs/testing"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { AuthService } from "./auth.service"
import { User } from "./user.entity"
import { NotFoundException } from "@nestjs/common"

describe("UsersController", () => {
  let controller: UsersController
  let usersService: Partial<UsersService>
  let authService: Partial<AuthService>

  beforeEach(async () => {
    usersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: "test@test2.com",
          password: "12345678",
        } as User),
      find: (email: string) =>
        Promise.resolve([{ id: 2, email, password: "12345678" }] as User[]),
      update: (id: number, attrs: Partial<User>) =>
        Promise.resolve({ status: 201, message: "successfully updated" }),
      remove: (id) =>
        Promise.resolve({ status: 201, message: "successfully removed" }),
    }
    authService = {
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
      signup: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  it("findAllUsers returns a list of users with the given email", async () => {
    const users = await controller.findAllUsers("z@a.com")
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          password: expect.any(String),
        }),
      ]),
    )
  })

  it("findUser returns a single user with the given id", async () => {
    const users = await controller.findUser(1)
    expect(users).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: expect.any(String),
        password: expect.any(String),
      }),
    )
  })

  it("findUser throws an error if a user with the given id is not found", async () => {
    usersService.findOne = () => Promise.resolve(null)
    await expect(controller.findUser(1)).rejects.toThrowError(NotFoundException)
  })

  it("signin updates session object and returns user", async () => {
    const session: any = {}
    const user = await controller.signIn(
      { email: "azaz@gm.com", password: "3030469" },
      session,
    )

    await expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: expect.any(String),
        password: expect.any(String),
      }),
    )
    await expect(session.id).toEqual(user.id)
  })
})

import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"
import { User } from "./user.entity"
import { BadRequestException } from "@nestjs/common"
import { randomBytes, scrypt as _scrypt } from "crypto"
import { promisify } from "util"

const scrypt = promisify(_scrypt)

describe("Auth Service Test Suite", () => {
  let authService: AuthService
  let usersService: Partial<UsersService>

  beforeEach(async () => {
    usersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: "test@test.com",
          password: "password",
        } as User),
      find: () => Promise.resolve([] as User[]),
      create: (email: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        } as User),
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile()

    authService = module.get(AuthService)
  })

  it("Can create an instance of Auth Service", async () => {
    expect(authService).toBeDefined()
  })
  it("create a new user with salted and hashed password", async () => {
    const user = await authService.signup("asdf@a.com", "12354678")
    expect(user.password).not.toEqual("12354678")
    const [salt, hash] = user.password.split(".")
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it("Should throw an error during signup if email is already in use", async () => {
    usersService.find = () =>
      Promise.resolve([
        { id: 1, email: "a@a.com", password: "123456" },
      ] as User[])

    await expect(authService.signup("a@a.com", "123456")).rejects.toThrowError()
  })

  it("Should throw an error during signin if email is not in db", async () => {
    await expect(authService.signin("a@a.com", "123546")).rejects.toThrowError()
  })

  it("Should throw an error if the sign in password does not match with db hashed password", async () => {
    usersService.find = () =>
      Promise.resolve([
        {
          email: "a@a.com",
          password: "12345678",
        },
      ] as User[])
    /**
     * The below promise will not fulfill
     * as hashed password is not returned
     *  */
    // const user = await authService.signin("a@a.com", "12345678")

    await expect(authService.signin("a@a.com", "abcdef")).rejects.toThrowError(
      BadRequestException,
    )
  })

  it("Should resolve successfully if the sign in password match with db hashed password", async () => {
    const password = "12345678"
    const salt = randomBytes(8).toString("hex")
    const hash = (await scrypt(password, salt, 32)) as Buffer
    const result = salt + "." + hash.toString("hex")

    usersService.find = () =>
      Promise.resolve([
        {
          email: "a@a.com",
          password: result,
        },
      ] as User[])

    const user = await authService.signin("a@a.com", "12345678")
    expect(user).toBeDefined()
  })
})

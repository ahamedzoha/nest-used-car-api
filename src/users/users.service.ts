import { Injectable, NotFoundException } from "@nestjs/common"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "./user.entity"
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findOne(id: number) {
    return this.repo.findOneBy({
      id,
    })
  }

  find(email: string) {
    return this.repo.find({
      where: {
        email,
      },
    })
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password })
    return this.repo.save(user)
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id)
    if (!user) throw new NotFoundException("User Not Found")
    Object.assign(user, attrs)
    this.repo.save(user)
    return {
      status: 201,
      message: `User ${id} updated successfully`,
    }
  }
  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) throw new NotFoundException("User does not exist")
    this.repo.remove(user)
    return {
      status: 201,
      message: `User ${id} removed successfully`,
    }
  }
}

import { ApiHideProperty } from "@nestjs/swagger"
import { Report } from "src/reports/report.entity"
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @ApiHideProperty()
  @Column({ default: true })
  admin: boolean

  @Column()
  email: string

  @ApiHideProperty()
  @Column()
  password: string

  @ApiHideProperty()
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id: ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed User with id: ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id: ${this.id}`)
  }
}

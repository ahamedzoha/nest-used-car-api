import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Report } from "./report.entity"
import { Repository } from "typeorm"
import { CreateReportDto } from "./dtos/create-report.dto"
import { User } from "src/users/user.entity"
import { ApprovedReportDto } from "./dtos/approved-report.dto"
import { GetEstimateDto } from "./dtos/get-estimate.dto"

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  estimatePrice(queryObject: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select("AVG(price)", "price")
      .where("make = :make", { make: queryObject.make })
      .andWhere("model = :model", { model: queryObject.model })
      .andWhere("lng - :lng BETWEEN -5 AND 5", { lng: queryObject.lng })
      .andWhere("lat - :lat BETWEEN -5 AND 5", { lat: queryObject.lat })
      .andWhere("year - :year BETWEEN -3 AND 3", { year: queryObject.year })
      .andWhere("approved IS TRUE")
      .orderBy("ABS(mileage - :mileage)", "DESC")
      .setParameter("mileage", queryObject.mileage)
      .limit(3)
      .getRawOne()
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto)
    report.user = user

    return this.repo.save(report)
  }

  async changeApproval(id: number, isApproved: boolean) {
    const report = await this.repo.findOneBy({ id })

    if (!report) throw new NotFoundException("Report not found")

    report.approved = isApproved
    return this.repo.save(report)
  }
}

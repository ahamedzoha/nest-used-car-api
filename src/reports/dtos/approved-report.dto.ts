import { Expose } from "class-transformer"
import { IsBoolean } from "class-validator"

export class ApprovedReportDto {
  @Expose()
  @IsBoolean()
  approved: boolean
}

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common"
import { CreateReportDto } from "./dtos/create-report.dto"
import { ReportsService } from "./reports.service"
import { AuthGuard } from "../guards/auth.guard"
import { CurrentUser } from "../users/decorators/current-user.decorator"
import { User } from "../users/user.entity"
import { Serialize } from "../interceptors/serialize.interceptor"
import { ReportDto } from "./dtos/report.dto"
import { ApprovedReportDto } from "./dtos/approved-report.dto"
import { AdminGuard } from "../guards/admin.guard"
import { GetEstimateDto } from "./dtos/get-estimate.dto"

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.estimatePrice(query)
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user)
  }

  @Patch("/:id")
  @UseGuards(AdminGuard)
  //   @Serialize(ReportDto)
  approveReport(@Param("id") id: number, @Body() body: ApprovedReportDto) {
    return this.reportsService.changeApproval(id, body.approved)
  }
}

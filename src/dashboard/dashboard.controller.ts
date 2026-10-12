import { Controller, Get, Query } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
@Controller("dashboard")
export class DashboardController {
  constructor(private service: DashboardService) {}
  @Get() getSummary(@Query("month") month: string) { return this.service.getSummary(month); }
}

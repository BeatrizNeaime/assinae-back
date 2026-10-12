import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "../common/entities";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
@Module({ imports: [TypeOrmModule.forFeature([Payment])], controllers: [DashboardController], providers: [DashboardService] })
export class DashboardModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subscription } from "../common/entities";
import { SubscriptionsController } from "./subscriptions.controller";
import { SubscriptionsService } from "./subscriptions.service";
@Module({ imports: [TypeOrmModule.forFeature([Subscription])], controllers: [SubscriptionsController], providers: [SubscriptionsService] })
export class SubscriptionsModule {}

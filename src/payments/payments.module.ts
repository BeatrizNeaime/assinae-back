import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Participant, ParticipantSubscription, Payment, Subscription } from "../common/entities";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
@Module({ imports: [TypeOrmModule.forFeature([Payment, Participant, Subscription, ParticipantSubscription])], controllers: [PaymentsController], providers: [PaymentsService] })
export class PaymentsModule {}

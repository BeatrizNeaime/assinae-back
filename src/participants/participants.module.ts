import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Participant, ParticipantSubscription, Subscription } from "../common/entities";
import { ParticipantsController } from "./participants.controller";
import { ParticipantsService } from "./participants.service";
@Module({ imports: [TypeOrmModule.forFeature([Participant, ParticipantSubscription, Subscription])], controllers: [ParticipantsController], providers: [ParticipantsService] })
export class ParticipantsModule {}

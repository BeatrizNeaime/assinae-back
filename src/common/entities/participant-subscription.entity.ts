import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Participant } from "./participant.entity";
import { Subscription } from "./subscription.entity";
@Entity("participant_subscriptions")
@Unique("uq_participant_subscription", ["participant", "subscription"])
export class ParticipantSubscription {
  @PrimaryGeneratedColumn() id!: number;
  @ManyToOne(() => Participant, x => x.subscriptions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "participant_id" }) participant!: Participant;
  @ManyToOne(() => Subscription, x => x.participantSubscriptions, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "subscription_id" }) subscription!: Subscription;
  @CreateDateColumn({ name: "created_at" }) createdAt!: Date;
}

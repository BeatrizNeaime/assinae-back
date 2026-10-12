import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ParticipantSubscription } from "./participant-subscription.entity";
import { Payment } from "./payment.entity";
@Entity("participants")
export class Participant {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 120 }) name!: string;
  @Column({ type: "boolean", default: true }) active!: boolean;
  @OneToMany(() => ParticipantSubscription, x => x.participant) subscriptions!: ParticipantSubscription[];
  @OneToMany(() => Payment, x => x.participant) payments!: Payment[];
  @CreateDateColumn({ name: "created_at" }) createdAt!: Date;
  @UpdateDateColumn({ name: "updated_at" }) updatedAt!: Date;
}

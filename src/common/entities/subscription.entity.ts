import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ParticipantSubscription } from "./participant-subscription.entity";
import { Payment } from "./payment.entity";
@Entity("subscriptions")
export class Subscription {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 40, unique: true }) name!: string;
  @Column({ name: "price_cents", type: "int", unsigned: true, default: 0 }) priceCents!: number;
  @Column({ type: "boolean", default: true }) active!: boolean;
  @OneToMany(() => ParticipantSubscription, x => x.subscription) participantSubscriptions!: ParticipantSubscription[];
  @OneToMany(() => Payment, x => x.subscription) payments!: Payment[];
  @CreateDateColumn({ name: "created_at" }) createdAt!: Date;
  @UpdateDateColumn({ name: "updated_at" }) updatedAt!: Date;
}

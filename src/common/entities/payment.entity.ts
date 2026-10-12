import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Participant } from "./participant.entity";
import { Subscription } from "./subscription.entity";
export type PaymentStatus = "pending" | "paid";
@Entity("payments")
@Unique("uq_payment_month_participant_subscription", ["month", "participant", "subscription"])
export class Payment {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "char", length: 7 }) month!: string;
  @ManyToOne(() => Participant, x => x.payments, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "participant_id" }) participant!: Participant;
  @ManyToOne(() => Subscription, x => x.payments, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "subscription_id" }) subscription!: Subscription;
  @Column({ name: "amount_cents", type: "int", unsigned: true }) amountCents!: number;
  @Column({ type: "enum", enum: ["pending", "paid"], default: "pending" }) status!: PaymentStatus;
  @Column({ name: "paid_at", type: "datetime", nullable: true }) paidAt!: Date | null;
  @CreateDateColumn({ name: "created_at" }) createdAt!: Date;
  @UpdateDateColumn({ name: "updated_at" }) updatedAt!: Date;
}

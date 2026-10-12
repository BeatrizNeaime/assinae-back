import { IsIn } from "class-validator";
export class UpdatePaymentStatusDto { @IsIn(["pending", "paid"]) status!: "pending" | "paid"; }

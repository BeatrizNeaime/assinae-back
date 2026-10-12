import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "../common/entities";
@Injectable()
export class DashboardService {
  constructor(@InjectRepository(Payment) private payments: Repository<Payment>) {}
  async getSummary(month: string) {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw new BadRequestException("month deve estar no formato YYYY-MM.");
    const rows = await this.payments.find({ where: { month } });
    return {
      month,
      totalToReceiveCents: rows.filter(p => p.status === "pending").reduce((s, p) => s + p.amountCents, 0),
      totalReceivedCents: rows.filter(p => p.status === "paid").reduce((s, p) => s + p.amountCents, 0),
      pendingCount: rows.filter(p => p.status === "pending").length,
      paidCount: rows.filter(p => p.status === "paid").length,
      totalCount: rows.length
    };
  }
}

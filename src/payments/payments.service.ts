import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import {
  Participant,
  ParticipantSubscription,
  Payment,
  Subscription,
} from "../common/entities";
@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private payments: Repository<Payment>,
    @InjectRepository(Participant)
    private participants: Repository<Participant>,
    @InjectRepository(Subscription)
    private subscriptions: Repository<Subscription>,
    @InjectRepository(ParticipantSubscription)
    private links: Repository<ParticipantSubscription>,
    private dataSource: DataSource,
  ) {}
  async findByMonth(month: string) {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month))
      throw new BadRequestException("month deve estar no formato YYYY-MM.");
    return this.payments.find({
      where: { month },
      relations: { participant: true, subscription: true },
      order: { id: "ASC" },
    });
  }
  async generate(month: string) {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month))
      throw new BadRequestException("month deve estar no formato YYYY-MM.");
    return this.dataSource.transaction(async (m) => {
      const pr = m.getRepository(Participant),
        sr = m.getRepository(Subscription);
      const lr = m.getRepository(ParticipantSubscription),
        payr = m.getRepository(Payment);
      const participants = await pr.find({ where: { active: true } });
      const subscriptions = await sr.find({ where: { active: true } });
      const links = await lr.find({
        relations: { participant: true, subscription: true },
      });
      const existing = await payr.find({
        where: { month },
        relations: { participant: true, subscription: true },
      });
      const keys = new Set(
        existing.map((p) => `${p.participant.id}-${p.subscription.id}`),
      );
      const toCreate: Payment[] = [];
      for (const link of links) {
        if (!link.participant.active || !link.subscription.active) continue;
        if (
          !participants.some((p) => p.id === link.participant.id) ||
          !subscriptions.some((s) => s.id === link.subscription.id)
        )
          continue;
        const key = `${link.participant.id}-${link.subscription.id}`;
        if (keys.has(key)) continue;
        toCreate.push(
          payr.create({
            month,
            participant: link.participant,
            subscription: link.subscription,
            amountCents: link.subscription.priceCents,
            status: "pending",
            paidAt: null,
          }),
        );
        keys.add(key);
      }
      if (toCreate.length) await payr.save(toCreate);
      return payr.find({
        where: { month },
        relations: { participant: true, subscription: true },
        order: { id: "ASC" },
      });
    });
  }
  async updateStatus(id: number, status: "pending" | "paid") {
    const p = await this.payments.findOne({
      where: { id },
      relations: { participant: true, subscription: true },
    });
    if (!p) throw new NotFoundException("Pagamento não encontrado.");
    p.status = status;
    p.paidAt = status === "paid" ? new Date() : null;
    return this.payments.save(p);
  }
  async updateAmount(id: number, amountCents: number) {
    if (!Number.isInteger(amountCents) || amountCents < 0)
      throw new BadRequestException(
        "amountCents deve ser inteiro não negativo.",
      );
    const p = await this.payments.findOneBy({ id });
    if (!p) throw new NotFoundException("Pagamento não encontrado.");
    p.amountCents = amountCents;
    return this.payments.save(p);
  }
}

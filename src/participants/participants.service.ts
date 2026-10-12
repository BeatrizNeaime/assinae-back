import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, In, Repository } from "typeorm";
import { Participant, ParticipantSubscription, Subscription } from "../common/entities";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant) private participants: Repository<Participant>,
    @InjectRepository(Subscription) private subscriptions: Repository<Subscription>,
    private dataSource: DataSource
  ) {}
  findAll() { return this.participants.find({ relations: { subscriptions: { subscription: true } }, order: { id: "ASC" } }); }
  async findOne(id: number) {
    const p = await this.participants.findOne({ where: { id }, relations: { subscriptions: { subscription: true } } });
    if (!p) throw new NotFoundException("Participante não encontrado.");
    return p;
  }
  async create(dto: CreateParticipantDto) {
    const subscriptions = await this.subscriptions.findBy({ id: In(dto.subscriptionIds), active: true });
    const p = await this.dataSource.transaction(async m => {
      const pr = m.getRepository(Participant), lr = m.getRepository(ParticipantSubscription);
      const created = await pr.save(pr.create({ name: dto.name.trim(), active: dto.active ?? true }));
      if (subscriptions.length) await lr.save(subscriptions.map(subscription => lr.create({ participant: created, subscription })));
      return created;
    });
    return this.findOne(p.id);
  }
  async update(id: number, dto: UpdateParticipantDto) {
    const p = await this.findOne(id);
    await this.dataSource.transaction(async m => {
      const pr = m.getRepository(Participant), lr = m.getRepository(ParticipantSubscription);
      if (dto.name !== undefined) p.name = dto.name.trim();
      if (dto.active !== undefined) p.active = dto.active;
      await pr.save(p);
      if (dto.subscriptionIds !== undefined) {
        await lr.delete({ participant: { id } });
        const subs = await m.getRepository(Subscription).findBy({ id: In(dto.subscriptionIds), active: true });
        if (subs.length) await lr.save(subs.map(subscription => lr.create({ participant: p, subscription })));
      }
    });
    return this.findOne(id);
  }
  async archive(id: number) {
    const p = await this.findOne(id); p.active = false; await this.participants.save(p);
    return { success: true };
  }
}

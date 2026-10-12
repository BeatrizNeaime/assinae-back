import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscription } from "../common/entities";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
@Injectable()
export class SubscriptionsService implements OnModuleInit {
  constructor(@InjectRepository(Subscription) private repository: Repository<Subscription>) {}
  async onModuleInit() {
    for (const name of ["Spotify", "YouTube", "WellHub"]) {
      if (!(await this.repository.findOneBy({ name }))) {
        await this.repository.save(this.repository.create({ name, priceCents: 0, active: true }));
      }
    }
  }
  findAll() { return this.repository.find({ order: { id: "ASC" } }); }
  async update(id: number, dto: UpdateSubscriptionDto) {
    const s = await this.repository.findOneBy({ id });
    if (!s) throw new NotFoundException("Assinatura não encontrada.");
    Object.assign(s, dto); return this.repository.save(s);
  }
}

import { Body, Controller, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private service: SubscriptionsService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Patch(":id") update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateSubscriptionDto) { return this.service.update(id, dto); }
}

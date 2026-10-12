import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { IsInt, Min } from "class-validator";
import { PaymentsService } from "./payments.service";
import { GeneratePaymentsDto } from "./dto/generate-payments.dto";
import { UpdatePaymentStatusDto } from "./dto/update-payment-status.dto";
class UpdatePaymentAmountDto {
  @IsInt() @Min(0) amountCents!: number;
}
@Controller("payments")
export class PaymentsController {
  constructor(private service: PaymentsService) {}
  @Get() findByMonth(@Query("month") month: string) {
    return this.service.findByMonth(month);
  }
  @Post("generate") generate(@Body() dto: GeneratePaymentsDto) {
    return this.service.generate(dto.month);
  }
  @Patch(":id/status") updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePaymentStatusDto,
  ) {
    return this.service.updateStatus(id, dto.status);
  }
  @Patch(":id/amount") updateAmount(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePaymentAmountDto,
  ) {
    return this.service.updateAmount(id, dto.amountCents);
  }
}

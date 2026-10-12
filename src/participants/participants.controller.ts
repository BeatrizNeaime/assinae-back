import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ParticipantsService } from "./participants.service";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
@Controller("participants")
export class ParticipantsController {
  constructor(private service: ParticipantsService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(":id") findOne(@Param("id", ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateParticipantDto) { return this.service.create(dto); }
  @Patch(":id") update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateParticipantDto) { return this.service.update(id, dto); }
  @Patch(":id/archive") archive(@Param("id", ParseIntPipe) id: number) { return this.service.archive(id); }
}

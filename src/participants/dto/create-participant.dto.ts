import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
export class CreateParticipantDto {
  @IsString() @MinLength(1) @MaxLength(120) name!: string;
  @IsOptional() @IsBoolean() active?: boolean;
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  subscriptionIds!: number[];
}

import { IsArray, IsBoolean, IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
export class UpdateParticipantDto {
  @IsOptional() @IsString() @MinLength(1) @MaxLength(120) name?: string;
  @IsOptional() @IsBoolean() active?: boolean;
  @IsOptional() @IsArray() @IsInt({ each: true }) @Min(1, { each: true }) subscriptionIds?: number[];
}

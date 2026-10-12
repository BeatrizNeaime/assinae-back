import { IsBoolean, IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";
export class UpdateSubscriptionDto {
  @IsOptional() @IsString() @MaxLength(40) name?: string;
  @IsOptional() @IsInt() @Min(0) priceCents?: number;
  @IsOptional() @IsBoolean() active?: boolean;
}

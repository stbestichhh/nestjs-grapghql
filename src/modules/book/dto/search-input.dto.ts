import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class PublicationYearRangeInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  from?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(new Date().getFullYear())
  to?: number;
}

@InputType()
export class SearchFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  genre?: string;

  @Field(() => PublicationYearRangeInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => PublicationYearRangeInput)
  publicationYear?: PublicationYearRangeInput;
}

@InputType()
export class SearchInput {
  @Field({ nullable: true, description: 'Search text across all entities' })
  @IsOptional()
  @IsString()
  query?: string;

  @Field(() => SearchFiltersInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchFiltersInput)
  filters?: SearchFiltersInput;
}

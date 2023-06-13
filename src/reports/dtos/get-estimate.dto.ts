import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from "class-validator"
import { Transform } from "class-transformer"

export class GetEstimateDto {
  @IsNotEmpty({ message: "Make is required" })
  @IsString({ message: "Make must be a string" })
  make: string

  @IsNotEmpty({ message: "Model is required" })
  @IsString({ message: "Model must be a string" })
  model: string

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty({ message: "Year is required" })
  @IsNumber({}, { message: "Year must be a number" })
  @Max(new Date().getFullYear(), {
    message: "Vehicle manufacturing year cannot be greater than current year",
  })
  @Min(1930, { message: "No vehicles older than 1930" })
  year: number

  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty({ message: "Longitude is required" })
  @IsNumber({}, { message: "Longitude must be a number" })
  @IsLongitude({ message: "Longitude must be a valid longitude coordinate" })
  lng: number

  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty({ message: "Latitude is required" })
  @IsNumber({}, { message: "Latitude must be a number" })
  @IsLatitude({ message: "Latitude must be a valid latitude coordinate" })
  lat: number

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty({ message: "Mileage is required" })
  @IsNumber({}, { message: "Mileage must be a number" })
  @IsPositive({ message: "Mileage must be a positive number" })
  mileage: number
}

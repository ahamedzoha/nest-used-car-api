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

export class CreateReportDto {
  @IsNotEmpty({ message: "Price is required" })
  @IsNumber({}, { message: "Price must be a number" })
  @IsPositive({ message: "Price must be a positive number" })
  price: number

  @IsNotEmpty({ message: "Make is required" })
  @IsString({ message: "Make must be a string" })
  make: string

  @IsNotEmpty({ message: "Model is required" })
  @IsString({ message: "Model must be a string" })
  model: string

  @IsNotEmpty({ message: "Year is required" })
  @IsNumber({}, { message: "Year must be a number" })
  @Max(new Date().getFullYear(), {
    message: "Vehicle manufacturing year cannot be greater than current year",
  })
  @Min(1930, { message: "No vehicles older than 1930" })
  year: number

  @IsNotEmpty({ message: "Longitude is required" })
  @IsNumber({}, { message: "Longitude must be a number" })
  @IsLongitude({ message: "Longitude must be a valid longitude coordinate" })
  lng: number

  @IsNotEmpty({ message: "Latitude is required" })
  @IsNumber({}, { message: "Latitude must be a number" })
  @IsLatitude({ message: "Latitude must be a valid latitude coordinate" })
  lat: number

  @IsNotEmpty({ message: "Mileage is required" })
  @IsNumber({}, { message: "Mileage must be a number" })
  @IsPositive({ message: "Mileage must be a positive number" })
  mileage: number
}

import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductoDto {
    
    @IsString()
    public nombre: string;
    
    @IsNumber({
        maxDecimalPlaces: 4,

    })
    @Min(0)
    @Type(()=>Number)
    public precio: number;
}

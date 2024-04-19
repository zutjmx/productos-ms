import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsNumber()
    @IsPositive()
    id: number;
}

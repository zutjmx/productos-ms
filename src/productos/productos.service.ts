import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductosService extends PrismaClient implements OnModuleInit {
  
  private readonly logger = new Logger('ProductosService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Conectado a la base de datos')
  }

  create(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto';
  }

  findAll() {
    return `This action returns all productos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}

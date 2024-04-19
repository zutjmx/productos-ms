import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from '@prisma/client';
import { PaginacionDto } from 'src/common';

@Injectable()
export class ProductosService extends PrismaClient implements OnModuleInit {
  
  private readonly logger = new Logger('ProductosService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Conectado a la base de datos')
  }

  create(createProductoDto: CreateProductoDto) {
    return this.producto.create({
      data: createProductoDto
    });
  }

  async findAll(paginacionDto : PaginacionDto) {
    const {pagina, limite} = paginacionDto;
    const totalDePaginas = await this.producto.count();
    const ultimaPagina = Math.ceil(totalDePaginas/limite); 

    return {
      data: await this.producto.findMany({
        skip: (pagina - 1) * limite,
        take: limite
      }),
      meta: {
        total: totalDePaginas,
        pagina: pagina,
        ultimaPagina: ultimaPagina
      }
    };
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

import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
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
    const totalDePaginas = await this.producto.count({where: {disponible: true}});
    const ultimaPagina = Math.ceil(totalDePaginas/limite); 

    return {
      data: await this.producto.findMany({
        where: {disponible:true},
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

  async findOne(
    id: number
  ) {
    const producto = await this.producto.findFirst({
      where: {id, disponible: true}
    });

    if (!producto) {
      throw new NotFoundException(`No existe el producto con id: ${id}`);
    }

    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    await this.findOne(id);
    return this.producto.update({
      where: {id},
      data: updateProductoDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    
    // Hard Delete ini
    /* return this.producto.delete({
      where: {id}
    }); */
    // Hard Delete fin

    // Soft Delete ini
    const producto = await this.producto.update({
      where: {id},
      data: {
        disponible: false
      }
    });

    return producto;
    // Soft Delete fin
  }
}

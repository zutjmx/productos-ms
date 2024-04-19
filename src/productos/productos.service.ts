import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient, Prisma } from '@prisma/client';
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

  async findOne(
    productoWhereUniqueInput: Prisma.ProductoWhereUniqueInput
  ) {
    const producto = await this.producto.findUnique({
      where: productoWhereUniqueInput
    });

    if (!producto) {
      throw new NotFoundException(`No existe el producto con id: ${productoWhereUniqueInput.id}`);
    }

    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    await this.findOne({ id: Number(id) });
    return this.producto.update({
      where: {id},
      data: updateProductoDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}

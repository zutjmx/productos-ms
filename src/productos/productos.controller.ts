import { Controller, /* Get, Post, Body, Patch, Param, Delete, Query, */ ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginacionDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  //@Post()
  @MessagePattern({cmd: 'crear_producto'})
  create(@Payload() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  //@Get()
  @MessagePattern({cmd: 'obtener_productos'})
  findAll(@Payload() paginacionDto : PaginacionDto) {
    return this.productosService.findAll(paginacionDto);
  }

  //@Get(':id')
  @MessagePattern({cmd: 'obtener_producto'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd: 'actualizar_producto'})
  update(
    //@Param('id', ParseIntPipe) id: number, 
    //@Body() updateProductoDto: UpdateProductoDto
    @Payload() updateProductoDto: UpdateProductoDto
  ) {
    return this.productosService.update(updateProductoDto.id, updateProductoDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd: 'borrar_producto'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}

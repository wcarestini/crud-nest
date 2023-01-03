import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto
    })
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findFirst({
      where: {
        id
      }
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let response;

    try {
      response = await this.prisma.product.update({
        where: { id },
        data: {
          name: updateProductDto.name,
          price: updateProductDto.price
        }
      })
    } catch (e) {
      throw new HttpException("Não foi possível atualizar o produto com id informado.", HttpStatus.BAD_REQUEST)
    }
    
    return response;
  }

  async remove(id: number) {
    try {
      await this.prisma.product.delete({
        where: { id }
      });
    } catch(e) {
      throw new HttpException("Não foi possível remover o produto com id informado.", HttpStatus.BAD_REQUEST)
    }
  }
}

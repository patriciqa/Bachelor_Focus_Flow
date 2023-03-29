import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTimerDto as TimerDto } from 'src/dtos/CreateTimer.dto';

import { Timer } from './timer.model';

@Injectable()
export class TimerService {
  constructor(@InjectModel('Timer') private timerModel: Model<Timer>) {}

  async createTimeSlot(timerDto: TimerDto): Promise<Timer> {
    const createdTimer = new this.timerModel(timerDto);
    return createdTimer.save();
  }
  
  async getTimeSlots(): Promise<Timer[]> {
    return this.timerModel.find().exec();
  }



  //   async getSingleProduct(productId: string) {
  //     const product = await this.findProduct(productId);
  //     return {
  //       id: product.id,
  //       title: product.title,
  //       description: product.description,
  //       price: product.price,
  //     };
  //   }

  //   async updateProduct(
  //     productId: string,
  //     title: string,
  //     desc: string,
  //     price: number,
  //   ) {
  //     const updatedProduct = await this.findProduct(productId);
  //     if (title) {
  //       updatedProduct.title = title;
  //     }
  //     if (desc) {
  //       updatedProduct.description = desc;
  //     }
  //     if (price) {
  //       updatedProduct.price = price;
  //     }
  //     updatedProduct.save();
  //   }

  //   async deleteProduct(prodId: string) {
  //     const result = await this.productModel.deleteOne({_id: prodId}).exec();
  //     if (result.n === 0) {
  //       throw new NotFoundException('Could not find product.');
  //     }
  //   }

  //   private async findProduct(id: string): Promise<Product> {
  //     let product;
  //     try {
  //       product = await this.productModel.findById(id).exec();
  //     } catch (error) {
  //       throw new NotFoundException('Could not find product.');
  //     }
  //     if (!product) {
  //       throw new NotFoundException('Could not find product.');
  //     }
  //     return product;
  //   }
}

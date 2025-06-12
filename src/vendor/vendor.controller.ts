import {
  Controller,
  Body,
  Post,
  Put,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get()
  async getAllVendors() {
    try {
      return await this.vendorService.getAllVendors();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiBody({
    type: CreateVendorDto,
    examples: {
      default: {
        summary: 'Sample Vendor',
        value: {
          email: 'vendor@example.com',
          name: 'Sample Vendor',
        },
      },
    },
  })
  async createVendor(@Body() createVendorDto: CreateVendorDto) {
    try {
      return await this.vendorService.createVendor(createVendorDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateVendor(
    @Param('id') id: number,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    try {
      return await this.vendorService.updateVendor(id, updateVendorDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteVendor(@Param('id') id: number) {
    try {
      return await this.vendorService.deleteVendor(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

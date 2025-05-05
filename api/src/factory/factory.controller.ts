import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { FactoryService } from './factory.service';
import { CreateFactoryDto, UpdateFactoryDto } from './dto/factory.dto';

@Controller('factories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Post()
  @Roles('admin')
  create(@Body() createFactoryDto: CreateFactoryDto, @Request() req) {
    return this.factoryService.create(createFactoryDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.factoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factoryService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateFactoryDto: UpdateFactoryDto,
    @Request() req,
  ) {
    return this.factoryService.update(+id, updateFactoryDto, req.user.userId);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.factoryService.remove(+id);
  }

  @Get(':id/metrics')
  getFactoryMetrics(@Param('id') id: string) {
    return this.factoryService.getFactoryMetrics(+id);
  }
}
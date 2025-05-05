import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { DivisionService } from './division.service';
import { CreateDivisionDto, UpdateDivisionDto } from './dto/division.dto';

@Controller('divisions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  @Roles('admin', 'factory_manager')
  create(@Body() createDivisionDto: CreateDivisionDto, @Request() req) {
    return this.divisionService.create(createDivisionDto, req.user.userId);
  }

  @Get()
  findAll(@Query('factoryId') factoryId?: number) {
    if (factoryId) {
      return this.divisionService.findByFactory(factoryId);
    }
    return this.divisionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.divisionService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin', 'factory_manager')
  update(
    @Param('id') id: string,
    @Body() updateDivisionDto: UpdateDivisionDto,
    @Request() req,
  ) {
    return this.divisionService.update(+id, updateDivisionDto, req.user.userId);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.divisionService.remove(+id);
  }

  @Get(':id/metrics')
  getDivisionMetrics(@Param('id') id: string) {
    return this.divisionService.getDivisionMetrics(+id);
  }
}
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MachineService } from './machine.service';
import { CreateMachineDto, UpdateMachineDto } from './dto/machine.dto';

@Controller('machines')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post()
  @Roles('admin', 'factory_manager', 'division_manager')
  create(@Body() createMachineDto: CreateMachineDto, @Request() req) {
    return this.machineService.create(createMachineDto, req.user.userId);
  }

  @Get()
  findAll(@Query('divisionId') divisionId?: number) {
    if (divisionId) {
      return this.machineService.findByDivision(divisionId);
    }
    return this.machineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.machineService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin', 'factory_manager', 'division_manager')
  update(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
    @Request() req,
  ) {
    return this.machineService.update(+id, updateMachineDto, req.user.userId);
  }

  @Delete(':id')
  @Roles('admin', 'factory_manager')
  remove(@Param('id') id: string) {
    return this.machineService.remove(+id);
  }

  @Get(':id/metrics')
  getMachineMetrics(@Param('id') id: string) {
    return this.machineService.getMachineMetrics(+id);
  }
}
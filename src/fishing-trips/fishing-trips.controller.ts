import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FishingTripsService } from './fishing-trips.service';
import { CreateFishingTripDto } from './dto/create-fishing-trip.dto';
import { UpdateFishingTripDto } from './dto/update-fishing-trip.dto';

@Controller('fishing-trips')
export class FishingTripsController {
  constructor(private readonly fishingTripsService: FishingTripsService) {}

  @Post()
  create(@Body() createFishingTripDto: CreateFishingTripDto) {
    return this.fishingTripsService.create(createFishingTripDto);
  }

  @Get()
  findAll() {
    return this.fishingTripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fishingTripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFishingTripDto: UpdateFishingTripDto) {
    return this.fishingTripsService.update(+id, updateFishingTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fishingTripsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FishingSpotsService } from './fishing-spots.service';
import { CreateFishingSpotDto } from './dto/create-fishing-spot.dto';
import { UpdateFishingSpotDto } from './dto/update-fishing-spot.dto';

@Controller('fishing-spots')
export class FishingSpotsController {
  constructor(private readonly fishingSpotsService: FishingSpotsService) {}

  @Post()
  create(@Body() createFishingSpotDto: CreateFishingSpotDto) {
    return this.fishingSpotsService.create(createFishingSpotDto);
  }

  @Get()
  findAll() {
    return this.fishingSpotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fishingSpotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFishingSpotDto: UpdateFishingSpotDto) {
    return this.fishingSpotsService.update(+id, updateFishingSpotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fishingSpotsService.remove(+id);
  }
}

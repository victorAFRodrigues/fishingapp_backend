import { Injectable } from '@nestjs/common';
import { CreateFishingTripDto } from './dto/create-fishing-trip.dto';
import { UpdateFishingTripDto } from './dto/update-fishing-trip.dto';

@Injectable()
export class FishingTripsService {
  create(createFishingTripDto: CreateFishingTripDto) {
    return 'This action adds a new fishingTrip';
  }

  findAll() {
    return `This action returns all fishingTrips`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fishingTrip`;
  }

  update(id: number, updateFishingTripDto: UpdateFishingTripDto) {
    return `This action updates a #${id} fishingTrip`;
  }

  remove(id: number) {
    return `This action removes a #${id} fishingTrip`;
  }
}

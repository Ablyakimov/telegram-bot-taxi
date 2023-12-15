import { Module, forwardRef } from '@nestjs/common';
import { SetupUpdate } from './setup.update';
import { SetupService } from './setup.service';
import { DirectionModule } from 'src/direction/direction.module';

@Module({
  controllers: [],
  providers: [SetupService, SetupUpdate],
  imports: [
    forwardRef(() => DirectionModule)
  ]
})
export class SetupModule {}

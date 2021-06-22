import { Module } from '@nestjs/common';
import { AuthenticationModule } from './Authentication/authentication.module';

@Module({
  imports: [AuthenticationModule]
})
export class AppModule {}

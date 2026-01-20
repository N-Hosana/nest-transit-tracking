import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesModule } from './routes/routes.module';
import { BusesModule } from './buses/buses.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './database/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RoutesModule,
    BusesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}

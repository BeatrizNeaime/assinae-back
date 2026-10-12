import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParticipantsModule } from "./participants/participants.module";
import { SubscriptionsModule } from "./subscriptions/subscriptions.module";
import { PaymentsModule } from "./payments/payments.module";
import { DashboardModule } from "./dashboard/dashboard.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        type: "mysql" as const,
        host: c.get<string>("DB_HOST", "localhost"),
        port: c.get<number>("DB_PORT", 3306),
        username: c.get<string>("DB_USERNAME", "root"),
        password: c.get<string>("DB_PASSWORD", ""),
        database: c.get<string>("DB_DATABASE", "assinae"),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    ParticipantsModule,
    SubscriptionsModule,
    PaymentsModule,
    DashboardModule,
  ],
})
export class AppModule {}

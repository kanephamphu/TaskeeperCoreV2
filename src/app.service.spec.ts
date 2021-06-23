import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { UsersModule } from "src/users/users.module";
import { AuthModule } from "src/auth/auth.module";

describe("AppService", () => {
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AuthModule, UsersModule],
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appService = app.get<AppService>(AppService);
    });

    describe("app service", () => {
        it('should return "Hello World!"', () => {
            expect(appService.getHello()).toBe("Hello World!");
        });
    });
});

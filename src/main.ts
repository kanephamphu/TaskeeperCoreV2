import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "app.module";
import * as _ from "lodash";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Taskeeper Swagger")
        .setDescription("The Taskeeper API")
        .setVersion("1.0")
        .addTag("taskeeper")
        .addBearerAuth(
            {
                // I was also testing it without prefix 'Bearer ' before the JWT
                description: `[just text field] Please enter token in following format: Bearer <JWT>`,
                name: "Authorization",
                bearerFormat: "Bearer", // I`ve tested not to use this field, but the result was the same
                scheme: "Bearer",
                type: "http", // I`ve attempted type: 'apiKey' too
                in: "Header",
            },
            "access-token"
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api", app, document);

    app.useStaticAssets(_.join(__dirname, "public"), {
        index: false,
        prefix: "/public",
    });
    app.enableCors();

    await app.listen(process.env.PORT || 3001);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

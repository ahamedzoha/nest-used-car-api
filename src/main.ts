import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle("Used Car API Docs")
    .setDescription(
      "Documentation for Used Car API and examples on how to use them",
    )
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(process.env.PORT || 3000)
}
bootstrap()

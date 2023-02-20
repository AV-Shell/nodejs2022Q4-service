import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { load as yamlLoad } from 'js-yaml';
import { readFile } from 'fs/promises';
import { resolve as pathResolve } from 'path';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  console.log('env port', process.env.PORT);
  console.log('port ', PORT);
  let doc, pathToFile;

  try {
    pathToFile = pathResolve(__dirname, '../doc/api.yaml');
    const file = await readFile(pathToFile, 'utf8');
    doc = yamlLoad(file);
  } catch (e) {
    console.log(`can't load doc`);
    console.log(e);
  }

  const app = await NestFactory.create(AppModule, { cors: true });
  if (doc && pathToFile) {
    SwaggerModule.setup('doc', app, doc);
  }
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`Swagger started from file ${pathToFile} on \\doc endpoint`);
    console.log(`Server started on port = ${PORT}`);
  });
}
bootstrap();

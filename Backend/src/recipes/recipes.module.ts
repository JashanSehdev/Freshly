import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RecipesService } from './recipes.service.js';
import { RecipesController } from './recipes.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity.js';
import { AuthMiddleware } from './middleware/auth.middleware.js';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports :[TypeOrmModule.forFeature([Recipe]),JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '600s' },
    })],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware)
      .forRoutes(RecipesController);
  }
}
// export class RecipesModule  {}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  getAllRecipes() {
    return this.recipesService.getAllRecipes();
  }

  @Get('search')
  getByName(@Query('name') name?: string) {
    return this.recipesService.getRecipesByName(name || '');
  }

  @Get('search/letter/:letter')
  getByFirstLetter(@Param('letter') letter: string) {
    return this.recipesService.getRecipesByFirstLetter(letter);
  }

  @Get('ingredient/:ingredient')
  getByIngredient(@Param('ingredient') ingredient: string) {
    return this.recipesService.getRecipesByIngredient(ingredient);
  }

  @Get('area/:area')
  getByArea(@Param('area') area: string) {
    return this.recipesService.getRecipesByArea(area);
  }

  @Get('category/:category')
  getByCategory(@Param('category') category: string) {
    return this.recipesService.getRecipesByCategory(category);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.recipesService.getRecipeById(id);
  }

  @Get('random')
  getRandomRecipe() {
    return this.recipesService.getRandomRecipe();
  }

  @Get('categories')
  getAllCategories() {
    return this.recipesService.getAllCategories();
  }

  @Get('filters')
  getFilters(@Query('type') type: 'c' | 'a' | 'i') {
    return this.recipesService.getFiltersList(type);
  }
}

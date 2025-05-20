import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RecipesService {
  private readonly BASE_URL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.BASE_URL =
      this.configService.get<string>('RECIPE_API_BASE_URL') ||
      'https://www.themealdb.com/api/json/v1/1';
  }

  async getAllRecipes(): Promise<any> {
    const response$ = this.httpService.get(`${this.BASE_URL}/search.php?s=`);
    const response = await lastValueFrom(response$);
    return response.data;
  }
  async getRecipesByName(name: string): Promise<any> {
    const query = name || 'a';
    const response$ = this.httpService.get(
      `${this.BASE_URL}/search.php?s=${query}`
    );
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getRecipesByFirstLetter(letter: string): Promise<any> {
    const response$ = this.httpService.get(
      `${this.BASE_URL}/search.php?f=${letter}`
    );
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getRecipesByIngredient(ingredient: string): Promise<any> {
    const response$ = this.httpService.get(
      `${this.BASE_URL}/filter.php?i=${ingredient}`
    );
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getRecipesByArea(area: string): Promise<any> {
    const response$ = this.httpService.get(
      `${this.BASE_URL}/filter.php?a=${area}`
    );
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getRecipesByCategory(category: string): Promise<any> {
    const response$ = this.httpService.get(
      `${this.BASE_URL}/filter.php?c=${category}`
    );
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getRecipeById(id: string): Promise<any> {
    const response$ = this.httpService.get(
      `${this.BASE_URL}/lookup.php?i=${id}`
    );
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getRandomRecipe(): Promise<any> {
    const response$ = this.httpService.get(`${this.BASE_URL}/random.php`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getAllCategories(): Promise<any> {
    const response$ = this.httpService.get(`${this.BASE_URL}/categories.php`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getFiltersList(type: 'c' | 'a' | 'i'): Promise<any> {
    const response$ = this.httpService.get(
      `${this.BASE_URL}/list.php?${type}=list`
    );
    const response = await lastValueFrom(response$);
    return response.data;
  }
}

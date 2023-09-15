import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Egg } from './egg';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class CupcakeFactory {
  // 2 eggs
  private eggs: Egg[] = [{ color: 'white', size: 'large' }, { color: 'white', size: 'large' }];
  private salt: Ingredient = {
    name: 'Salt',
    type: 'Seasoning',
    quantityCupcake: '1/4 teaspoon',
    quantityFrosting: '1-2 pinches'
  };
  
  private butter: Ingredient = {
    name: 'Butter',
    type: 'Dairy',
    quantityCupcake: '6 tablespoons',
    quantityFrosting: '1 cup'
  };
  
  private flour: Ingredient = {
    name: 'Flour',
    type: 'Dry',
    quantityCupcake: '1 1/4 cups',
    quantityFrosting: 'NA'
  };
  
  private bakingPowder: Ingredient = {
    name: 'Baking Powder',
    type: 'Leavening Agent',
    quantityCupcake: '1 1/4 teaspoons',
    quantityFrosting: 'NA'
  };
  
  private sugar: Ingredient = {
    name: 'Sugar',
    type: 'Sweetener',
    quantityCupcake: '3/4 cup',
    quantityFrosting: 'NA'
  };
  
  private vegetableOil: Ingredient = {
    name: 'Vegetable Oil',
    type: 'Cooking Oil',
    quantityCupcake: '2 tablespoons',
    quantityFrosting: 'NA'
  };
  
  private milk: Ingredient = {
    name: 'Milk',
    type: 'Dairy',
    quantityCupcake: '1/2 cup plus 2 tablespoons',
    quantityFrosting: '2-3 tablespoons'
  };
  
  private powderedSugar: Ingredient = {
    name: 'Powdered Sugar',
    type: 'Sweetener',
    quantityCupcake: 'NA',
    quantityFrosting: '4 cups'
  };
  
  private vanilla: Ingredient = {
    name: 'Vanilla Extract',
    type: 'Flavoring',
    quantityCupcake: '1 1/2 teaspoons',
    quantityFrosting: '1 1/2 teaspoons'
  };

  constructor() {}

  getEggs(): Observable<Egg[]> {
    return of(this.eggs);
  }

  getSalt(): Observable<Ingredient> {
    return of(this.salt);
  }

  getButter(): Observable<Ingredient> {
    return of(this.butter);
  }

  getFlour(): Observable<Ingredient> {
    return of(this.flour);
  }

  getBakingPowder(): Observable<Ingredient> {
    return of(this.bakingPowder);
  }

  getSugar(): Observable<Ingredient> {
    return of(this.sugar);
  }

  getVegetableOil(): Observable<Ingredient> {
    return of(this.vegetableOil);
  }

  getMilk(): Observable<Ingredient> {
    return of(this.milk);
  }

  getPowderedSugar(): Observable<Ingredient> {
    return of(this.powderedSugar);
  }

  getVanilla(): Observable<Ingredient> {
    return of(this.vanilla);
  }

}

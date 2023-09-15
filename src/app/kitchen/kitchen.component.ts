import { of, Observable, forkJoin, catchError, concatMap, timer, tap, map, mergeMap, switchMap, take, finalize, throwError, delay } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { CupcakeFactory } from '../cupcake-factory.service';
import { OvenService } from "../oven.service";
import { Oven } from "../oven.model"
import { Bowl } from "../bowl.model";
import { Egg } from "../egg";
import { Ingredient } from "../ingredient";
import { Cookware } from "../cookware";

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
    // kitchen appliances/cookware
    oven: Oven;
    pan: Cookware;
    liners: Cookware;
    mixer: Cookware;
    medMixingBowl: Bowl;
    largeMixingBowl: Bowl;

    // ingredients
    eggs$!: Observable<Egg[]>;
    salt$!: Observable<Ingredient>;
    butter$!: Observable<Ingredient>;
    flour$!: Observable<Ingredient>;
    bakingPowder$!: Observable<Ingredient>;
    sugar$!: Observable<Ingredient>;
    vegetableOil$!: Observable<Ingredient>;
    milk$!: Observable<Ingredient>;
    powderedSugar$!: Observable<Ingredient>;
    vanilla$!: Observable<Ingredient>;

    constructor (
      private cupcakeFactory: CupcakeFactory,
      private ovenService: OvenService
      ) {
        this.oven = new Oven('My Oven', 'Electric');
        this.medMixingBowl = { size: 'medium' };
        this.largeMixingBowl = { size: 'large' };
        this.pan = { type: 'pan'}
        this.mixer = { type: 'mixer'}
        this.liners = { type: 'liners'}

        this.eggs$ = this.cupcakeFactory.getEggs().pipe(catchError(this.handleError));
        this.salt$ = this.cupcakeFactory.getSalt().pipe(catchError(this.handleError));
        this.butter$ = this.cupcakeFactory.getButter().pipe(catchError(this.handleError));
        this.flour$ = this.cupcakeFactory.getFlour().pipe(catchError(this.handleError));
        this.bakingPowder$ = this.cupcakeFactory.getBakingPowder().pipe(catchError(this.handleError));
        this.sugar$ = this.cupcakeFactory.getSugar().pipe(catchError(this.handleError));
        this.vegetableOil$ = this.cupcakeFactory.getVegetableOil().pipe(catchError(this.handleError));
        this.milk$ = this.cupcakeFactory.getMilk().pipe(catchError(this.handleError));
        this.powderedSugar$ = this.cupcakeFactory.getPowderedSugar().pipe(catchError(this.handleError));
        this.vanilla$ = this.cupcakeFactory.getVanilla().pipe(catchError(this.handleError));
      }

    ngOnInit(): void {
    }

    private handleError(error: any): Observable<any> {
      console.error('An error occurred:', error);
      return of(null);
    }

    combineDryIngredients(): Observable<null> {
      return timer(3000).pipe(
        concatMap(() =>
          forkJoin({
            salt: this.salt$,
            flour: this.flour$,
            bakingPowder: this.bakingPowder$,
           }).pipe(
            tap(({ salt, flour, bakingPowder }) => {
              // Check that all ingredients are available
              if (salt && flour && bakingPowder) {
                // Combine the ingredients in the mixing bowl
                console.log(`Combining ${salt.quantityCupcake} of ${salt.name}, ${flour.quantityCupcake} of ${flour.name}, and ${bakingPowder.quantityCupcake} of ${bakingPowder.name} in the ${this.medMixingBowl.size} bowl.`);
              } else {
                console.error('Not all ingredients are available.');
              }
            }),
            concatMap(() => of(null))
          )
        )
      );
    }

    combineWetIngredients(): Observable<null> {
      return timer(3000).pipe(
        concatMap(() =>
          forkJoin({
            butter: this.butter$,
            sugar: this.sugar$,
            oil: this.vegetableOil$,
            vanilla: this.vanilla$,
          }).pipe(
            tap(({ butter, sugar, oil, vanilla }) => {
              // Check that all ingredients are available
              if (butter && sugar && oil && vanilla) {
                // Add the ingredients to the mixer bowl
                console.log(`Adding ${butter.quantityCupcake} of ${butter.name}, ${sugar.quantityCupcake} of ${sugar.name}, ${oil.quantityCupcake} of ${oil.name}, and ${vanilla.quantityCupcake} of ${vanilla.name} to the ${this.largeMixingBowl.size} mixer bowl.`);
              } else {
                console.error('Not all ingredients are available.');
              }
            }),
            concatMap(() => of(null))
          )
        )
      );
    }
    
    addEggsAndMix(): Observable<null> {
      return timer(3000).pipe(
        concatMap(() =>
          forkJoin({
            eggs: this.eggs$,
          }).pipe(
            tap(({ eggs }) => {
              if (eggs && eggs.length > 0) {
                // Iterate through each egg
                eggs.forEach((value, index) => {
                  const eggNum = index + 1;
                  // Mix the egg with other ingredients in the mixing bowl
                  console.log(`Adding egg number ${eggNum} to the ${this.largeMixingBowl.size} mixing bowl and mixing until mostly combined.`);
                  console.log(`Egg number ${eggNum} is mostly combined.`);
                });
              } else {
                console.error('No eggs available.');
              }
            }),
            concatMap(() => of(null))
          )
        )
      );
    }
    
    prepareBatterAndPour(): Observable<null> {
      return timer(3000).pipe(
        concatMap(() =>
          forkJoin({
            flour: this.flour$,
            sugar: this.sugar$,
            bakingPowder: this.bakingPowder$,
            milk: this.milk$,
          }).pipe(
            concatMap(({ flour, sugar, bakingPowder, milk }) => {
              // Step 1: Add half of the dry ingredients to the batter and mix until mostly combined.
              console.log(`Adding half of the ${flour.name}, ${sugar.name}, and ${bakingPowder.name} to the batter in the ${this.largeMixingBowl.size} mixer bowl and mixing until mostly combined.`);
              // Simulate mixing by waiting for a few seconds
              return timer(2000).pipe(
                concatMap(() => {
                  console.log(`Dry ingredients are mostly combined.`);
                  // Step 2: Slowly add the milk and mix until well combined.
                  console.log(`Slowly adding ${milk.name} to the batter and mixing until well combined.`);
                  // Simulate mixing by waiting for a few seconds
                  return timer(2000);
                }),
                concatMap(() => {
                  console.log(`Milk is well combined.`);
                  // Step 3: Add the remaining dry ingredients and mix until well combined.
                  console.log(`Adding the remaining ${flour.name}, ${sugar.name}, and ${bakingPowder.name} to the batter and mixing until well combined.`);
                  // Simulate mixing by waiting for a few seconds
                  return timer(2000);
                }),
                concatMap(() => {
                  // Check if the batter is overmixed (random)
                  if (Math.random() > 0.5) {
                    // Throw an exception for overmixed batter
                    return throwError(new OverMixedBatterException('Batter is overmixed.'));
                  } else {
                    // Continue with the next step
                    console.log(`All ingredients are well combined.`);
                    // Step 4: Fill the cupcake liners about 3/4 full.
                    console.log(`Filling the cupcake liners about 3/4 full with the batter.`);
                    return of(null);
                  }
                }),
                catchError((error) => {
                  if (error instanceof OverMixedBatterException) {
                    // Handle the overmixed batter exception
                    console.error('Overmixed batter detected.');
                    console.log('Waiting for batter to settle...');
                    // Simulate settling by waiting for a few seconds
                    return timer(3000).pipe(
                      concatMap(() => {
                        console.log('Batter has settled.');
                        console.log(`Filling the cupcake liners about 3/4 full with the batter.`);
                        return of(null);
                      })
                    );
                  } else {
                    return throwError(error);
                  }
                })
              );
            }),
            concatMap(() => of(null))
          )
        )
      )
    }

    bakeCupcakes(): void {
      this.ovenService.preheatOven(this.oven, 350)
        .pipe(
          concatMap(() => this.combineDryIngredients()),
          concatMap(() => this.combineWetIngredients()),
          concatMap(() => this.addEggsAndMix()),
          concatMap(() => this.prepareBatterAndPour()),
          finalize(() => {
            console.log('Baking cupcakes...');
            timer(4000).pipe(
              concatMap(() => {
                console.log('Cupcakes are ready!');
                return of(null);
              })
            ).subscribe(() => {
              console.log('Set cupcakes aside to cool.');
            });
          })
        )
        .subscribe();
    }
  }
class OverMixedBatterException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OverMixedBatterException';
  }
}

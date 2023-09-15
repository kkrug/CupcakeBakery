import { of, Observable } from "rxjs";
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
export class KitchenComponent {
    // kitchen appliances/cookware
    oven: Oven;
    pan!: Cookware;
    liners!: Cookware;
    mixer!: Cookware;
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
      }

    ngOnInit(): void {
      // initialize ingredient observables
      this.eggs$ = this.cupcakeFactory.getEggs();
      this.salt$ = this.cupcakeFactory.getSalt();
      this.butter$ = this.cupcakeFactory.getButter();
      this.flour$ = this.cupcakeFactory.getFlour();
      this.bakingPowder$ = this.cupcakeFactory.getBakingPowder();
      this.sugar$ = this.cupcakeFactory.getSugar();
      this.vegetableOil$ = this.cupcakeFactory.getVegetableOil();
      this.milk$ = this.cupcakeFactory.getMilk();
      this.powderedSugar$ = this.cupcakeFactory.getPowderedSugar();
      this.vanilla$ = this.cupcakeFactory.getVanilla();
    }

    combineDryIngredients(): void {
      this.salt$.subscribe((salt: Ingredient) => {
        this.flour$.subscribe((flour: Ingredient) => {
          this.bakingPowder$.subscribe((bakingPowder: Ingredient) => {
            // Check that all ingredients are available
            if (salt && flour && bakingPowder) {
              // Combine the ingredients in the mixing bowl
              console.log(`Combining ${salt.quantityCupcake} of ${salt.name}, ${flour.quantityCupcake} of ${flour.name}, and ${bakingPowder.quantityCupcake} of ${bakingPowder.name} in the ${this.medMixingBowl.size} bowl.`);
            } else {
              console.error('Not all ingredients are available.');
            }
          });
        });
      });  
    }

    combineWetIngredients(): void {
      this.butter$.subscribe((butter: Ingredient) => {
        this.sugar$.subscribe((sugar: Ingredient) => {
          this.vegetableOil$.subscribe((oil: Ingredient) => {
            this.vanilla$.subscribe((vanilla: Ingredient) => {
              // Check that all ingredients are available
              if (butter && sugar && oil && vanilla) {
                // Add the ingredients to the mixer bowl
                console.log(`Adding ${butter.quantityCupcake} of ${butter.name}, ${sugar.quantityCupcake} or ${sugar.name}, ${oil.quantityCupcake} of ${oil.name}, and ${vanilla.quantityCupcake} of ${vanilla.name} to the ${this.largeMixingBowl.size} mixer bowl.`);
              } else {
                console.error('Not all ingredients are available.');
              }
            });
          });
        });
      });
    }

    addEggsAndMix(): void {
      this.eggs$.subscribe((eggs: Egg[]) => {
        if (eggs && eggs.length > 0) {
          // Iterate through each egg
          for (const egg of eggs) {
            // Mix the egg with other ingredients in the mixing bowl
            console.log(`Adding an egg to the ${this.largeMixingBowl.size} mixing bowl and mixing until mostly combined.`);
            // Simulate mixing by waiting for a few seconds
            setTimeout(() => {
              console.log(`Egg is mostly combined.`);
            }, 2000);
          }
        } else {
          console.error('No eggs available.');
        }
      });
    }

    prepareBatterAndPour(): void {
    // Assuming you have retrieved the ingredients through observables
    this.flour$.subscribe((flour: Ingredient) => {
      this.sugar$.subscribe((sugar: Ingredient) => {
        this.bakingPowder$.subscribe((bakingPowder: Ingredient) => {
          this.milk$.subscribe((milk: Ingredient) => {
            // Step 1: Add half of the dry ingredients to the batter and mix until mostly combined.
            console.log(`Adding half of the ${flour.name}, ${sugar.name}, and ${bakingPowder.name} to the batter in the ${this.largeMixingBowl.size} mixer bowl and mixing until mostly combined.`);
            // Simulate mixing by waiting for a few seconds
            setTimeout(() => {
              console.log(`Dry ingredients are mostly combined.`);
              // Step 2: Slowly add the milk and mix until well combined.
              console.log(`Slowly adding ${milk.name} to the batter and mixing until well combined.`);
              // Simulate mixing by waiting for a few seconds
              setTimeout(() => {
                console.log(`Milk is well combined.`);
                
                // Step 3: Add the remaining dry ingredients and mix until well combined.
                console.log(`Adding the remaining ${flour.name}, ${sugar.name}, and ${bakingPowder.name} to the batter and mixing until well combined.`);
                // Simulate mixing by waiting for a few seconds
                setTimeout(() => {
                  console.log(`All ingredients are well combined.`);

                  // Step 4: Fill the cupcake liners about 3/4 full.
                  console.log(`Filling the cupcake liners about 3/4 full with the batter.`);
                  
                }, 2000);
              }, 2000);
            }, 2000);
        });
      });
    });
    });
  }   

  bakeCupcakes(): void {
    this.ovenService.preheatOven(this.oven, 350).subscribe(() => {
      // Preheating is complete, call the methods in order
      this.combineDryIngredients();
      this.combineWetIngredients();
      this.addEggsAndMix();
      this.prepareBatterAndPour();

      // After preparing the batter, call the bakeInOven method with the baking time
      this.ovenService.bakeInOven(this.oven, 15).subscribe(() => {
        console.log('Set cupcakes aside to cool.');
    });
    });
  }
  
}

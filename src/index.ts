import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Adjust the path as needed
import { KitchenComponent } from './app/kitchen/kitchen.component';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    // Access your KitchenComponent and trigger the baking process here
    const appInjector = moduleRef.injector;
    const kitchenComponent = appInjector.get(KitchenComponent);

    // Call the bakeCupcakes method to start the baking process
    kitchenComponent.bakeCupcakes();
  })
  .catch((err) => console.error(err));

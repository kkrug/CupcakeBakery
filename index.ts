import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './src/app/app.module';
import { KitchenComponent } from './src/app/kitchen/kitchen.component';
import 'zone.js/dist/zone';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    const appInjector = moduleRef.injector;
    const kitchenComponent = appInjector.get(KitchenComponent);

    kitchenComponent.bakeCupcakes();
  })
  .catch((err) => console.error(err));

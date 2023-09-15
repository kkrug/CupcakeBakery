import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { KitchenComponent } from './app/kitchen/kitchen.component';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    const appInjector = moduleRef.injector;
    const kitchenComponent = appInjector.get(KitchenComponent);

    kitchenComponent.bakeCupcakes();
  })
  .catch((err) => console.error(err));

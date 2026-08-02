import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { META_REDUCERS, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { ActionLogService, createActionLogMetaReducer } from './shared/state-inspector/action-log.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({}), // signal - public, read-only from outside
    provideEffects([]),
    // META_REDUCERS - multi-token: provided via a DI factory so that the same
    // singleton ActionLogService injected into state-inspector.component.ts
    // is the exact one writing to the meta-reducer's log. A direct `new ActionLogService()`
    // here would create TWO separate instances - the panel would always stay empty.
    {
      provide: META_REDUCERS,
      multi: true,
      deps: [ActionLogService],
      useFactory: createActionLogMetaReducer,
    },
    // Keeping Redux DevTools too — for anyone who wants the familiar browser extension,
    // our in-page panel is for anyone viewing the demo without DevTools
    importProvidersFrom(StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false })),
  ],
};

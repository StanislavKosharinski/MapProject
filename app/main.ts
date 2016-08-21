import { bootstrap }    from '@angular/platform-browser-dynamic';
import {enableProdMode} from "@angular/core";
import {APP_ROUTER_PROVIDERS} from "./map.routes"
import {MapComponent} from "./map.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {Authenticator} from "./utils/Authentificator";
import {provideForms, disableDeprecatedForms} from "@angular/forms";
enableProdMode();
bootstrap(MapComponent, [APP_ROUTER_PROVIDERS, {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideForms(), disableDeprecatedForms(), Authenticator]).
catch(err => console.error(err));

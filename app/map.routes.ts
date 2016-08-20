import {RouterConfig, provideRouter} from "@angular/router";
import {MapDirective} from "./directives/map.directive";
import {LoginDirective} from "./directives/login.directive";
/**
 * Created by strukov on 8/20/16.
 */
export const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/map',
        pathMatch: 'full'
    },

    { path: 'map', component: MapDirective },
    { path: 'login', component: LoginDirective }
];

// Export routes
export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
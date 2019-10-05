import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignedInGuard } from './_helpers/signed-in.guard';
import { HomeResolver } from './_helpers/home.resolver';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [ SignedInGuard ],
        children: [
            {
                path: '',
                component: HomeComponent,
                resolve: {
                    data: HomeResolver
                },
            },
        ]
    },
    {
        path: 'sign-in',
        loadChildren: './_modules/authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'login',
        redirectTo: '/sign-in',
        pathMatch: 'full'
    }
];
const options: ExtraOptions = {
    useHash: false,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
};

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes, options);

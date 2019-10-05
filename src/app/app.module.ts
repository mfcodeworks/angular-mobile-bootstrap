import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSnackBar,
    MatProgressBarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatMenuModule
} from '@angular/material';
import { environment } from '../environments/environment';

import { Routing } from './app.routing';
import { SignedInGuard } from './_helpers/signed-in.guard';
import { HomeResolver } from './_helpers/home.resolver';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import {
    AuthenticationModule
} from './_modules/authentication/authentication.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DateDiffPipe } from './_helpers/date-diff.pipe';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        AuthenticationModule,
        OverlayModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        MatGridListModule,
        MatToolbarModule,
        MatInputModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatStepperModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        MatMenuModule,
        MatBottomSheetModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireMessagingModule,
        Routing,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        BottomBarComponent,
        HomeComponent,
        DateDiffPipe
    ],
    providers: [
        MatSnackBar,
        SignedInGuard,
        HomeResolver
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

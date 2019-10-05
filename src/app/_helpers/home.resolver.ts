import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BackendService } from '../_services/backend/backend.service';

import { Example } from '../_models/example';

@Injectable()
export class HomeResolver implements Resolve<Observable<Example[]>> {

    constructor(private backend: BackendService) { }

    resolve(): Observable<Example[]> {
        return this.backend.getExamples().pipe(
            catchError((error) => {
                return of(error);
            })
        );
    }
}

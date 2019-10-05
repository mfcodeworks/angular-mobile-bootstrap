import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Example } from '../_models/example';

declare const _: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    data: Example[] = null;
    userId: number;

    constructor(
        private route: ActivatedRoute,
        private errorToast: MatSnackBar
    ) {}

    public ngOnInit() {
        // Get data from route resolver data
        this.route.data.subscribe((data: any) => {
            if (data.data instanceof Array) {
                this.data = data.data;
                console.log(this.data);
            } else {
                console.error(data.data);
                this.errorToast.open(data.posts, 'close', {
                    duration: 3000
                });
            }
        });
    }

    removeData(id: number) {
        // Remove data from array
        _.remove(this.data, (p: any) => {
            return parseInt(p.id, 10) === id;
        });
    }
}

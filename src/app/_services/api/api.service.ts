import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
import { Example } from '../../_models/example';
import { Profile } from '../../_models/profile';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) {}

    // API: Sign Up User
    signUp(username: string, password: string, email: string): any {
        return this.http
        .post(`${API_URL}/signup`, {
            username,
            password,
            email
        }, this.getRequestHeaders())
        .pipe(
            catchError(this.handleError)
        );
    }

    // API: Sign In User
    signIn(username: string, password: string): any {
        return this.http
        .post(`${API_URL}/login`, {
            username,
            password
        }, this.getRequestHeaders())
        .pipe(
            catchError(this.handleError)
        );
    }

    // API: Send User Forgot Password Request
    forgotPassword(email: string): any {
        return this.http
        .post(`${API_URL}/forgot`, {
            email
        }, this.getRequestHeaders())
        .pipe(
            catchError(this.handleError)
        );
    }

    // API: Reset User Password
    resetPassword(token: string, email: string, password: string, passwordConfirmation: string): any {
        return this.http
        .post(`${API_URL}/reset`, {
            token,
            email,
            password,
            password_confirmation: passwordConfirmation
        }, this.getRequestHeaders())
        .pipe(
            catchError(this.handleError)
        );
    }

    // API: Get User Profile
    getUser(): Observable<Profile> {
        return this.http
        .get<Profile>(`${API_URL}/me`, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Update User Profile
    updateUser(user: Profile): Observable<Profile> {
        return this.http
        .put<Profile>(`${API_URL}/me/update`,
            user,
            this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Deactivate user profile
    deactivateProfile(): any {
        return this.http
        .post(`${API_URL}/me/deactivate`, null, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Save FCM Token
    saveFcm(token: string): any {
        return this.http
        .post(`${API_URL}/me/fcm/token`, { token }, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Subscribe to FCM Topic
    subscribeFcm(token: string, topic: string): any {
        return this.http
        .post(`${API_URL}/me/fcm/subscribe/${topic}`, { token }, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Unsubcribe from FCM Topic
    unsubscribeFcm(token: string, topic: string): any {
        return this.http
        .post(`${API_URL}/me/fcm/unsubscribe/${topic}`, { token }, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: User search
    search(query: string): Observable<Profile[]> {
        return this.http
        .get<Profile[]>(`${API_URL}/search?query=${query}`, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError),
            map((response) => response.map(
                profile => new Profile(profile)
            ))
        );
    }

    // API: Get User Feed
    getExamples(): Observable<Example[]> {
        const exampleArray = new Subject<Example[]>();
        exampleArray.next([
            {
                id: 1,
                title: 'Example 1'
            },
            {
                id: 2,
                title: 'Example 2',
                description: 'With a description'
            }
        ]);
        return exampleArray.asObservable();
    }

    // Error handling
    handleError(error: any) {
        // DEBUG:
        console.warn(error);

        // Instantiate error message
        let errorMessage: any;

        // Set error message
        if (error instanceof HttpErrorResponse) {
            errorMessage = (error.error) ? error : `(${error.status}) Message: ${error.statusText}`;
        } else {
            errorMessage = `(${error.status}) Message: ${error.error}`;
        }
        return throwError(errorMessage);
    }

    // Http Headers
    private getRequestHeaders() {
        const headers = {
            headers: new HttpHeaders({
                // 'Content-Type': 'application/json',
                Authorization: (this.userService.token) ? `Bearer ${this.userService.token}` : ''
            })
        };
        return headers;
    }
}

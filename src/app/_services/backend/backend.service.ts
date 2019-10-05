import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { Profile } from '../../_models/profile';
import { Example } from '../../_models/example';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    profiles: Profile[] = [];
    data: Example[] = [];

    constructor(private api: ApiService) {}

    // Sign Up User
    signUp(username: string, password: string, email: string): any {
        return this.api.signUp(username, password, email);
    }

    // Sign In User
    signIn(username: string, password: string): any {
        return this.api.signIn(username, password);
    }

    // Send User Forgot Password Request
    forgotPassword(email: string): any {
        return this.api.forgotPassword(email);
    }

    // Reset User Password
    resetPassword(token: string, email: string, password: string, passwordConfirmation: string): any {
        return this.api.resetPassword(token, email, password, passwordConfirmation);
    }

    // Get User Profile
    getUser(): Observable<Profile> {
        return this.api.getUser();
    }

    // Update User Profile
    updateUser(user: Profile): Observable<Profile> {
        return this.api.updateUser(user);
    }

    // Deactivate user profile
    deactivateProfile(): any {
        return this.api.deactivateProfile();
    }

    // Save FCM Token
    saveFcm(token: string): any {
        return this.api.saveFcm(token);
    }

    // Subscribe to FCM Topic
    subscribeFcm(token: string, topic: string): any {
        return this.api.subscribeFcm(token, topic);
    }

    // Unsubcribe from FCM Topic
    unsubscribeFcm(token: string, topic: string): any {
        return this.api.unsubscribeFcm(token, topic);
    }

    // User search
    search(query: string): Observable<Profile[]> {
        return this.api.search(query);
    }

    // Get User Feed
    getExamples(): Observable<Example[]> {
        return this.api.getExamples();
    }
}

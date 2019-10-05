export class Profile {
    id: number;
    username: string;
    profilePic: string;
    fcmToken?: string;

    constructor(values: any = {}) {
        Object.assign(this, values);
    }
}

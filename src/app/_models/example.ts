export class Example {
    id: number;
    title: string;
    description?: string;

    constructor(values: any = {}) {
        Object.assign(this, values);
    }
}

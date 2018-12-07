export class UIEvent<T> {
    private name: string;
    private buble: boolean = true;
    private readonly __body: T;

    constructor (name: string, data: T) {
        this.name = name;
        this.__body = data;
    }

    getName (): string {
        return this.name;
    }

    getData (): T {
        return this.__body;
    }

    isBuble (): boolean {
        return this.buble;
    }

    stopPropagation (): void {
        this.buble = false;
    }
}

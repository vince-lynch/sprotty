/**
 * Created by koehnlein on 21/02/2017.
 */

export interface Map<T> {
    [key: string]: T
}

export class EventSource<CALLBACK> {
    callbacks: CALLBACK[] = []

    register(callback: CALLBACK) {
        this.callbacks.push(callback)
    }

    deregister(callback: CALLBACK) {
        const index = this.callbacks.indexOf(callback)
        if (index != -1)
            this.callbacks.splice(index, 1)
    }
}

export class ProviderRegistry<T, U> {
    private elements: Map<new(U) => T> = {}

    register(key: string, cstr: new (U) => T) {
        this.elements[key] = cstr
    }

    deregister(key: string) {
        delete this.elements[key]
    }

    hasKey(key: string): boolean {
        return this.elements.hasOwnProperty(key)
    }

    get(key: string, arg: U): T {
        if (this.hasKey(key))
            return new this.elements[key](arg)
        else
            throw new Error('Unknown registry key: ' + key)
    }
}

export class InstanceRegistry<T> {
    private elements: Map<T> = {}

    register(key: string, cstr: T) {
        this.elements[key] = cstr
    }

    deregister(key: string) {
        delete this.elements[key]
    }

    hasKey(key: string): boolean {
        return this.elements.hasOwnProperty(key)
    }

    get(key: string): T {
        if (this.hasKey(key))
            return this.elements[key]
        else
            throw new Error('Unknown registry key: ' + key)
    }
}

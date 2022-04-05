import {
    CreatePostInput
} from '../contracts';
import {
    HttpMethods,
} from 'core-framework';

export class HealthcheckService {

    #name: string;
    #version: string;

    constructor(
        name: string, 
        version: string
    ) {
        this.setName(name);
        this.setVersion(version);
    }

    static create(data: {
        name: string,
        version: string,
    }): HealthcheckService {
        const {
            name,
            version,
        } = data;
        return new HealthcheckService(
            name, 
            version
        );
    }

    setName(name: string): void {
        this.#name = name;
    }

    getName(): string {
        return this.#name;
    }

    setVersion(version: string): void {
        this.#version = version;
    }

    getVersion(): string {
        return this.#version;
    }

    public getControllers() {
        return [
            {
                method: HttpMethods.GET,
                url: '/healthcheck',
                handler: this.healthcheck,
            }
        ]
    }

    public healthcheck({
        metadata,
        params,
    }: {
        metadata: Record<string, unknown>,
        params: CreatePostInput,
    }): Record<string, string> {
       return {
           message: 'is alive',
       }
    }
}
import {
    CreatePostInput
} from '../contracts';
import {
    HttpMethods,
    Logger,
} from 'core-framework';

import {
    ProductManagerInstance,
} from '../managers';

export class ProductService {

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
    }): ProductService {
        const {
            name,
            version,
        } = data;
        return new ProductService(
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
                method: HttpMethods.POST,
                url: 'db/product/save',
                handler: this.createProduct,
            }
        ]
    }

    public async createProduct({
        metadata,
        params,
    }: {
        metadata: Record<string, unknown>,
        params: CreatePostInput,
    }): Promise<Record<string, unknown>> {
        //@ts-ignore
        Logger.warn(metadata.request.body);
        const data = {
            title: 'hola',
            body: 'hey',
            category: 'fiction',
            published: true,
        };
        await ProductManagerInstance.create(data);
        return data;
    }
}
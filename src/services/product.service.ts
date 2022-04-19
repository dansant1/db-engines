import {
    CreatePostInput
} from '../contracts';
import {
    HttpMethods,
    Logger,
} from 'core-framework';
import {
    Constants
} from '../shared/constants';
import {
    ProductManagerInstance,
    CacheManagerInstance
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
                url: '/db/product/save',
                handler: this.createProduct,
            },
            {
                method: HttpMethods.GET,
                url: '/db/skusByCountry/:iso',
                handler: this.getSkusByCountry
            },
            {
                method: HttpMethods.POST,
                url: '/db/cache/set',
                handler: this.setCache
            },
            {
                method: HttpMethods.GET,
                url: '/db/cache/get/:key',
                handler: this.getCache
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
        const data = metadata.request.body;
        console.log(data)
        Logger.warn(data);
        await ProductManagerInstance.create(data);
        return data;
    }

    public async getSkusByCountry({
        metadata,
        params,
    }: {
        metadata: Record<string, unknown>,
        params: CreatePostInput,
    }) {
        // let params = metadata.metadata.request.params;
        // let id = Constants.countries[params.iso]
        const data = await ProductManagerInstance.getSkusByCountryId('1');
        return data;
    }

    public async setCache({ 
        metadata, 
        params 
    }
    ) {
        const body = metadata.request.body;
        const data = await CacheManagerInstance.set(body);
        return data;
    }

    public async getCache({
        metadata,
        params
    }) {
        const key = metadata.request.params.key;
        const data = await CacheManagerInstance.get(key)
        return data;
    }
}
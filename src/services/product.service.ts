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

    public async getSkusByCountry(
        metadata: Record<string, any>
    ) {
        let params = metadata.metadata.request.params;
        let id = Constants.countries[params.iso]
        const data = await ProductManagerInstance.getSkusByCountryId(id);
        return data;
    }
}
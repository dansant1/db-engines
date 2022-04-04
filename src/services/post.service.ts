import {
    CreatePostInput
} from '../contracts';
import {
    HttpMethods,
    Logger,
} from 'core-framework';

import {
    PostManagerInstance,
} from '../managers';

export class PostService {

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
    }): PostService {
        const {
            name,
            version,
        } = data;
        return new PostService(
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
                url: '/post',
                handler: this.createPost,
            }
        ]
    }

    public async createPost({
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
        await PostManagerInstance.create(data);
        return data;
    }
}
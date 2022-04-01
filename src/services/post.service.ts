import {
    CreatePostInput
} from '../contracts';
import {
    HttpMethods,
    Logger,
} from 'core-framework';
export class PostService {

    static create(): PostService {
        return new PostService();
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

    createPost({
        metadata,
        params,
    }: {
        metadata: Record<string, unknown>,
        params: CreatePostInput,
    }): Record<string, unknown> {
        //@ts-ignore
        Logger.warn(metadata.request.body);
        return {
            id: 2,
            title: 'hola',
            body: 'hey',
            category: 'fiction',
            published: true,
        };
    }
}
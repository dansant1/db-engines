import {
    Post, 
    CreatePostInput
} from '../contracts';
export class PostService {

    static create(): PostService {
        return new PostService();
    }

    getQuery() {
        return {
            posts: this.posts,
        }
    }

    getMutation() {
        return {
            createPost: this.createPost,
        }
    }

    getSchema() {
        return this.getType();
    }

    getType() {
        return `
            type Query {
                posts: [Post]!
            }

            type Mutation {
                createPost(data: CreatePostInput!): Post!
            }

            type Post {
                id: ID!
                title: String!
                body: String!
                category: String!
                published: Boolean!
            }

            input CreatePostInput {
                id: ID
                title: String!
                body: String!
                category: String!
                published: Boolean!
            }
        `;
    }

    createPost({
        metadata,
        params,
    }: {
        metadata: Record<string, unknown>,
        params: CreatePostInput,
    }): string {
        return 'Post created';
    }

    posts({
        metadata,
    }: {
        metadata: Record<string, unknown>,
    }): Post[] {
        return [{
            id: 2,
            title: 'hola',
            body: 'hey',
            category: 'fiction',
            published: true,
        }];
    }
}
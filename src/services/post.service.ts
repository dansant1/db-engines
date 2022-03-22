import {Post, CreatePostInput} from '../contracts';
export class PostService {

    static create(): PostService {
        return new PostService();
    }

    getQuery() {
        return {
            createPost: this.createPost
        }
    }

    getMutation() {
        return {
            getPost: this.getPosts
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

    createPost(data: CreatePostInput): string {
        return 'Post created';
    }

    getPosts(): Post[] {
        console.log("Llegó a getPost")
        return [{
            id: 2,
            title: 'hello',
            body: 'hey',
            category: 'fiction',
            published: true,
        }];
    }
}
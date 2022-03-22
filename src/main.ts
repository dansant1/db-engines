import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/src/.env` });
import {
    AppFactory,
    ServerBuilder,
    Protocols,
    GatewayTypes,
    Platforms,
    ConfigGraphQL,
} from 'core-framework';

const services = {
    resolvers: {
        Query: {
            posts: (_, obj) => {
               return [{
                   id: 2,
                   title: 'hello',
                   body: 'hey',
                   category: 'fiction',
                   published: true,
               }];
            },
        },
        Mutation: {
            createPost: (_, { data }) => {
               return 'mutation hello';
            }
        }
    },
    schema: `
        type Query {
            post(id: ID!): Post!
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
    `,
} as ConfigGraphQL;

const server = new ServerBuilder();
server.setPort(9000);
server.setProtolType(Protocols.HTTP);
server.setServerType(Platforms.FASTIFY);
server.setGatewayType(GatewayTypes.GraphQL);
server.setEntryType(services);
server.setConfig({ logger: true });

const app = AppFactory.create(server);

console.log('APP=', app);

app.listen();
import { GatewayBuilder } from '../gateway';
import { PostService } from './post.service';
const postService = PostService.create();


const service_query: unknown[] = [
    postService.getQuery()
];
const service_mutation: unknown[] = [
    postService.getMutation()
];
const service_schemas: string[] = [
    postService.getSchema(),
];

export const buidServices = GatewayBuilder.create(
    service_query,
    service_mutation,
    service_schemas,
);
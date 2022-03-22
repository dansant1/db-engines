import { GatewayBuilder } from '../gateway';
import { PostService } from './post.service';
const postService = PostService.create();


const services_query: unknown[] = [
    postService.getQuery()
];
const services_mutation: unknown[] = [
    postService.getMutation()
];

export const buidServices = GatewayBuilder.create(
    services_query,
    services_mutation,
    postService.getSchema()
);
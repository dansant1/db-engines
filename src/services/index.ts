import {
    GatewayBuilder, 
    GatewayTypes, 
    IRest,
} from 'core-framework';
import { PostService } from './post.service';

const postService = PostService.create({
    name: 'db-post',
    version: '1',
});

const controllers: IRest[] = postService.getControllers();

export const buidServices = GatewayBuilder.create(
    GatewayTypes.REST, {
        controllers,
    },
);
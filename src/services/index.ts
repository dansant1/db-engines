import {
    GatewayBuilder, 
    GatewayTypes, 
    IRest,
} from 'core-framework';
import { PostService } from './post.service';

const postService = PostService.create();

const controllers: IRest[] = postService.getControllers();

export const buidServices = GatewayBuilder.create(
    GatewayTypes.REST, {
        controllers,
    },
);
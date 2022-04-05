import {
    GatewayBuilder, 
    GatewayTypes, 
    IRest,
} from 'core-framework';
import { 
    PostService 
} from './post.service';
import {
    HealthcheckService,
} from './healthcheck.service';

const postService = PostService.create({
    name: 'db-post',
    version: '1',
});

const healthcheckService = HealthcheckService.create({
    name: 'db-healthcheck',
    version: '1',
})

const controllers: IRest[] = [
    ...postService.getControllers(), 
    ...healthcheckService.getControllers()
];

export const buidServices = GatewayBuilder.create(
    GatewayTypes.REST, {
        controllers,
    },
);
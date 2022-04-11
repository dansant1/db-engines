import {
    GatewayBuilder, 
    GatewayTypes, 
    IRest,
} from 'core-framework';
import { 
    ProductService, 
} from './product.service';
import {
    HealthcheckService,
} from './healthcheck.service';

const productService = ProductService.create({
    name: 'db-post',
    version: '1',
});

const healthcheckService = HealthcheckService.create({
    name: 'db-healthcheck',
    version: '1',
})

const controllers: IRest[] = [
    ...productService.getControllers(), 
    ...healthcheckService.getControllers()
];

export const buidServices = GatewayBuilder.create(
    GatewayTypes.REST, {
        controllers,
    },
);
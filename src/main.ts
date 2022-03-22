import {
    AppFactory,
    ServerBuilder,
    Protocols,
    GatewayTypes,
    Platforms,
    ConfigGraphQL,
    EnvConfigFactory,
    ConfigType,
} from 'core-framework';
import { 
    buidServices 
} from './services';

export const config = EnvConfigFactory.create({
    configType: ConfigType.ENV,
});
console.log('NODE_ENV=', config.get('NODE_ENV'));

const server = new ServerBuilder();
server.setPort(9000);
server.setProtolType(Protocols.HTTP);
server.setServerType(Platforms.FASTIFY);
server.setGatewayType(GatewayTypes.GraphQL);
server.setEntryType(buidServices.buildGraphQL() as ConfigGraphQL);
server.setConfig({ logger: false });

const app = AppFactory.create(server);

console.log('APP=', app);

app.listen();
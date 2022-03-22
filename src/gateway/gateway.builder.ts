import {
    Logger,
} from 'core-framework';
export class GatewayBuilder {
    public readonly Query: Record<string, unknown> = {};
    public readonly Mutation: Record<string, unknown> = {};
    public readonly services_query: Record<string, any>[] = [];
    public readonly services_mutation: Record<string, any>[] = [];
    public schema: string = '';

    constructor(services_query: Record<string, any>[], services_mutation: Record<string, any>[], schemas: string[]) {
        this.services_query = services_query;
        this.services_mutation = services_mutation;
        Logger.warn('Service Gateway Inited');
        this.buildSchemas(schemas);
        this.buildQuery();
        this.buildMutation();
    }

    static create(services_query, services_mutation, schema: string[]): GatewayBuilder {
        return new GatewayBuilder(services_query, services_mutation, schema);
    }

    public getResolvers() {
        return {
            Query: this.Query,
            Mutation: this.Mutation
        }
    }

    public getSchema() {
        return this.schema;
    }

    public buildGraphQL(){
        return {
            resolvers: this.getResolvers(),
            schema: this.getSchema()
        }
    }

    buildSchemas(schemas: string[]) {
        schemas.forEach((schema) => this.schema += schema);
    }

    buildQuery() {
        this.services_query.forEach(
            (data: { key: string, handler: any }) => {
                const _func = (Object.entries(data))[0] as any;
                this.Query[_func[0]] = (_, obj)  => 
                _func[1](_, obj);
            }
        );
    }

    buildMutation() {
        this.services_mutation.forEach(
            (data: { key: string, handler: any }) => {
                const _func = (Object.entries(data))[0] as any;
                this.Mutation[_func[0]] = (_, obj) => 
                _func[1](_, obj);
            }
        );
    }
}
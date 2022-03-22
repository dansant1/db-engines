export class GatewayBuilder {
    public readonly Query: Record<string, unknown> = {};
    public readonly Mutation: Record<string, unknown> = {};
    public readonly services_query: Record<string, any>[] = [];
    public readonly services_mutation: Record<string, any>[] = [];
    public readonly schema: string = "";

    constructor(services_query: Record<string, any>[], services_mutation: Record<string, any>[], schema: string) {
        this.services_query = services_query;
        this.services_mutation = services_mutation;
        this.schema = schema;
    }

    static create(services_query, services_mutation, schema): GatewayBuilder {
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

    buildQuery() {
        this.services_query.forEach((data: { key: string, handler: any }) => {
            this.Query[data.key] = (_, obj) => {
                return data.handler;
            }
        })
    }

    buildMutation() {
        this.services_mutation.forEach((data: { key: string, handler: any }) => {
            this.Mutation[data.key] = (_, obj) => {
                return data.handler;
            }
        })
    }
}
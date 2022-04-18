import {
    knexInstance as knex,
} from '../config';

export class ProductManager {

    static create(): ProductManager {
        return new ProductManager();
    }

    public async getSkusByCountryId(id: string): Promise<void> {
        const response = await knex('sku').join('sku_schedule', 'sku.id', 'sku_schedule.sku_id')
        .where({'sku_schedule.country_id': id})
        .select('sku.code')
        return response;
    }

    public async create(data: Record<string, any>): Promise<void> {
        const { product, sku } = data;
        const productCreated = await knex('product')
        .insert(product);
        await knex('sku', {
            ...sku,
            product_id: productCreated.id,
        })
    }

    public async update(data: Record<string, unknown>): Promise<void> {
        await knex('product')
        .where('id', '=', 1)
        .update(data);
    }

    public async delete(id: number): Promise<void> {
        await knex('product')
        .where('id', '=', id)
        .del();
    }
}


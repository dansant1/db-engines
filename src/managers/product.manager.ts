import {
    knexInstance as knex,
} from '../config';

export class ProductManager {

    static create(): ProductManager {
        return new ProductManager();
    }

    public async create(data: Record<string, unknown>): Promise<void> {
        await knex('product')
        .insert(data);
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


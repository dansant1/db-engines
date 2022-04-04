import {
    knexInstance as knex,
} from '../config';

export class PostManager {

    static create(): PostManager {
        return new PostManager();
    }

    public async create(data: Record<string, unknown>): Promise<void> {
        await knex('post')
        .insert(data);
    }

    public async update(data: Record<string, unknown>): Promise<void> {
        await knex('post')
        .where('id', '=', 1)
        .update(data);
    }

    public async delete(id: number): Promise<void> {
        await knex('post')
        .where('id', '=', id)
        .del();
    }
}


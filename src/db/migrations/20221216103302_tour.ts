import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tour',table => {
        table.uuid('id').primary().notNullable().unique().defaultTo(knex.raw("(UUID())"))
        table.string('name').notNullable().unique()
        table.integer('duration').notNullable()
        table.integer('max_group_size').notNullable()
        table.enu('difficulty',['easy','medium','difficult']).notNullable()
        table.float('ratings_average').defaultTo(3.5)
        table.integer('rating_quantity').defaultTo(0)
        table.float('price', 2, 1).notNullable()
        table.float('price_discount', 2, 1).defaultTo(0.00)
        table.string('summary').notNullable()
        table.string('description').notNullable()
        table.string('image_cover').notNullable()
        table.timestamps(true, true)
        table.timestamp('start_dates').defaultTo(knex.fn.now()).notNullable()
        table.boolean('secret_tour').defaultTo(false)
        table.string('images')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tour')
}


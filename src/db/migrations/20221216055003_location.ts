import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('location', table => {
        table.uuid('id').primary().notNullable().unique().defaultTo(knex.raw("(UUID())"))
        table.uuid('user_id').unique().notNullable().defaultTo(knex.raw("(UUID())"))
        table.string('address_text').notNullable()
        table.integer('postal_code').notNullable()
        table.string('lat').notNullable()
        table.string('lng').notNullable()
        table.string('country').notNullable()
    })

}


export async function down(knex: Knex): Promise<void> {
}


import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('person', table => {
        table.uuid('id').primary().notNullable().unique().defaultTo(knex.raw("(UUID())"))
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.json('friends').defaultTo({})
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('person')
}
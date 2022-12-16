import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('person', table => {
        table.uuid('id').primary().notNullable().unique().defaultTo(knex.raw("(UUID())"))
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        table.string('name').notNullable()
        table.string('photo').defaultTo(null)
        table.enu('role',['user','lead-guide','guide','admin']).defaultTo('user')
        table.boolean('active').defaultTo(true)
        table.timestamps(true, true)
    })
}   

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('person')
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("Gorevler", tbl=>{
    tbl.increments("GorevId")
    tbl.string("Adi").notNullable()
    tbl.string("Aciklama")
  })
  .createTable("Tasklar", tbl=>{
    tbl.increments("TaskId")
    tbl.string("Adi").notNullable()
    tbl.string("Aciklama")
    tbl.dateTime("Tarih").defaultTo(knex.fn.now())
    tbl.integer("GorevId").references("GorevId").inTable("Gorevler").onDelete("CASCADE").onUpdate("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Tasklar")
                    .dropTableIfExists("Gorevler");
};

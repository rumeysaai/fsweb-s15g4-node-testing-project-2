/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Tasklar').truncate()
  await knex('Gorevler').truncate()
  await knex('Gorevler').insert([
    {GorevId: 1, Adi:"Sağlıklı beslen", Aciklama: 'Sağlıklı olmak için'},
  ]);
  await knex('Tasklar').insert([
    {Adi:"Spora git", Aciklama: '1 saat kardiyo yap', Tarih:new Date().toLocaleDateString(), GorevId:1},
    {Adi:"Sebze ye", Aciklama: 'Beslenmene dikkat et', Tarih:new Date().toLocaleDateString(), GorevId:1},
  ]);
};

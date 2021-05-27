exports.seed = function(knex) {
    return knex('species').insert([
      {species_type:"Flowering Plants"},
      {species_type:"Conifers, cycads & Allies"},
      {species_type:"Ferns & Fern Allies"},
      {species_type:"Mosses & Liverworts"},
      {species_type:"Cacti"},
      {species_type:"Winter Plants"},
      {species_type:"Tropical Plants"},
    ])
  };
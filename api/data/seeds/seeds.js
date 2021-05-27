exports.seed = function(knex) {
    return knex('plants').insert([
      {
        nickname: "Pretty Flower",
        water_frequency: "Once Daily",
        species_id: 1,
        user_id: 1
      },{
        nickname: "Yellow Plant",
        water_frequency: "Once an hour",
        species_id: 2,
        user_id: 1
      },{
        nickname: "Cactus",
        water_frequency: "1x Morning",
        species_id: 3,
        user_id: 5
      },{
        nickname: "Kacktus",
        water_frequency: "1x During Cold Hours",
        species_id: 4,
        user_id: 5
      },{
        nickname: "Dandilion",
        water_frequency: "Twice Daily",
        species_id: 5,
        user_id: 3
      }
    ])
  };
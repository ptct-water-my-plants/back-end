exports.seed = function(knex) {
      return knex('users').insert([
          {
              username: "abcd1234",
              password: "$2a$10$c4pQE1UeQoCnqIsr6Ncsp.n8I8/G8GoJYcbF3mH7NleyDOm2.1cqK",
              phoneNumber: "1234567890"
          },{
              username: "1234abcd",
              password: "$2a$10$WeRVo9bM51kYE3ufwivs4O5NK0l0ODmZIqw6iMBXBfmAWAqZONXJS",
              phoneNumber: "2345678901"
          },{
              username: "Tony So",
              password: "$2a$10$WeRVo9bM51kYE3ufwivs4O5NK0l0ODmZIqw6iMBXBfmAWAqZONXJS",
              phoneNumber: "8851234567"
          },
      ])
  };
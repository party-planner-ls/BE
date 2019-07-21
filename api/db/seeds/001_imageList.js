exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("image_list")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("image_list").insert([{ name: "images" }]);
    });
};

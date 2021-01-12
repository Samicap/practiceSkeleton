module.exports = (db) => {
  const getAllUsers = function () {
    return db.query(`SELECT * FROM users;`);
  };

  const addNewUser = function (name, id) {
    return db.query(`INSERT INTO users (name, id) VALUES ($1, $2)`, [name, id])
  }

  return { getAllUsers, addNewUser };

};


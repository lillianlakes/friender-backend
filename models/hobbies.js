"use strict";

const db = require("../db");

/** Related functions for hobbies. */

class Hobbies {
  /** Add data for hobbies to a specific user.
   *
   **/

  static async add({ username, hobbies }) {

    hobbies.map(async function(hobby) {
      await db.query(
        `INSERT INTO users_hobbies(
          username,
          hobby
        )
        VALUES($1, $2)`,
      [username, hobby],
      )
    });
  }

  /** Update hobbies for a specific user by 
   *  deleting all hobbies for that user from database
   *  and re-inserting the updated hobbies
   * 
   */

  static async update({ username, hobbies }) {

    await db.query(
      `DELETE
       FROM users_hobbies
       WHERE username = $1`,
       [username],    
    );

    hobbies.map(async function(hobby) {
      await db.query(
        `INSERT INTO users_hobbies(
          username,
          hobby
        )
        VALUES($1, $2)`,
      [username, hobby],
      )
    });
  }




  /** Given a username, return all the hobbies that match that about user.
   *
   * Returns an array of hobbies as { hobbies }
   *
   **/

   static async get(username) {
    const hobbiesRes = await db.query(
          `SELECT hobby
           FROM users_hobbies
           WHERE username = $1`,
        [username],
    );

    const hobbies = hobbiesRes.rows;

    return hobbies.map(h => h.hobby);
  }  
}

module.exports = Hobbies;

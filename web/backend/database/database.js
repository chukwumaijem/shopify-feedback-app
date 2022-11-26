import sqlite3 from 'sqlite3';
import path from 'path';

export const Database = {
  qrCodesTableName: 'user_feedback',
  db: null,
  ready: null,
  dbPath: path.join(process.cwd(), 'database.sqlite'),

  create: async function ({ shopDomain, shopId, customer, feedback }) {
    await this.ready;

    const query = `
      INSERT INTO ${this.qrCodesTableName}
      (shopDomain, shopId, customer, feedback)
      VALUES (?, ?, ?, ?)
      RETURNING id;
    `;

    const rawResults = await this.__query(query, [
      shopDomain,
      shopId,
      customer,
      feedback,
    ]);

    return rawResults[0].id;
  },

  list: async function (shopDomain) {
    await this.ready;
    const query = `
      SELECT id, customer, feedback, createdAt
      FROM ${this.qrCodesTableName}
      WHERE shopDomain = ?;
    `;

    return await this.__query(query, [shopDomain]);
  },

  read: async function (id) {
    await this.ready;
    const query = `
      SELECT * FROM ${this.qrCodesTableName}
      WHERE id = ?;
    `;
    const rows = await this.__query(query, [id]);
    if (!Array.isArray(rows) || rows?.length !== 1) return undefined;

    return rows[0];
  },

  /* Private */

  /*
    Used to check whether to create the database.
    Also used to make sure the database and table are set up before the server starts.
  */
  __hasUserFeedbackTable: async function () {
    const query = `
      SELECT name FROM sqlite_schema
      WHERE
        type = 'table' AND
        name = ?;
    `;
    const rows = await this.__query(query, [this.qrCodesTableName]);
    return rows.length === 1;
  },

  /* Initializes the connection with the app's sqlite3 database */
  init: async function () {
    /* Initializes the connection to the database */
    this.db = this.db ?? new sqlite3.Database(this.dbPath);

    const hasTable = await this.__hasUserFeedbackTable();

    if (hasTable) {
      this.ready = Promise.resolve();

      /* Create the QR code table if it hasn't been created */
    } else {
      const query = `
        CREATE TABLE ${this.qrCodesTableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          shopDomain VARCHAR(511) NOT NULL,
          shopId INTEGER NOT NULL,
          customer VARCHAR(255) NOT NULL,
          feedback VARCHAR(255) NOT NULL,
          createdAt DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
        )
      `;

      /* Tell the various CRUD methods that they can execute */
      this.ready = this.__query(query);
    }
  },

  /* Perform a query on the database. Used by the various CRUD methods. */
  __query: function (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  },
};

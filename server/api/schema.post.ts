import { createDBquery } from "~/db/queries";
import { db } from "../utils";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = crypto.randomUUID();

  const checkIfExistsQuery = `
    SELECT COUNT(*) as count FROM schema;
  `;

  const insertQuery = `
    INSERT INTO schema (id, value)
    VALUES ('${id}', '${JSON.stringify(body.value)}');
  `;

  db.exec(createDBquery);

  const hasResults = async () => {
    return await new Promise((resolve, reject) => {
      db.all(checkIfExistsQuery, [], (err, rows: { count: number }[]) => {
        if (err) reject(err);
        else resolve(rows[0]?.count > 0);
      });
    });
  };

  const result = (await hasResults()) as boolean;

  if (!result) {
    db.exec(insertQuery);
  }

  return "";
});

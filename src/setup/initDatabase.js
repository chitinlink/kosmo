import { mkdir, readdir, readFile } from "fs/promises";
import { JSONFile, Low } from "lowdb";
import { Validator } from "jsonschema";
import logger from "../logging.js";

const validator = new Validator();

export default async client => readdir(new URL("./database", import.meta.url))
  .then(folders => folders
    .forEach(async name => {
      const db = new Low(
        new JSONFile((new URL(`../../data/${name}.json`, import.meta.url)).pathname)
      );
      const schema = JSON.parse(
        await readFile(new URL(`./database/${name}/${name}.schema.json`, import.meta.url))
      );
      const starter = JSON.parse(
        await readFile(new URL(`./database/${name}/${name}.starter.json`, import.meta.url))
      );

      await db.read()
        .then(() => db.data ||= starter)
        .then(data => {
          if (!validator.validate(data, schema).valid) {
            throw new Error(`Invalid data in ${name} database.`);
          }
          return data;
        })
        .then(() => db.write());

      client.db.set(name, db);
    })
  )
  .then(mkdir(new URL("../../data", import.meta.url))
    .catch(e => {
      if (e.code !== "EEXIST") throw e;
    }))
  .then(() => logger.info("Loaded databases."));

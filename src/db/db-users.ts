import * as fs from "node:fs";
import { User } from "../models/user-dto";

class DataBase {
  constructor() {
    try {
      const loadingDb = fs.readFileSync("./mock/db.json");
      Object.assign(this, JSON.parse(loadingDb.toString("utf-8")));
    } catch {
      console.log("Data base Created");
      this.saveDb();
    }
  }

  users: User[] = [];

  saveDb() {
    fs.writeFileSync("./mock/db.json", JSON.stringify(this, null, 2));
  }
}

export const db = new DataBase();

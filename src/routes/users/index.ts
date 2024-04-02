import type { Body } from "@kitajs/runtime";
import { db } from "../../db/db-users";
import { UserCreateDTO } from "../../models/user-dto";

/**
 * @tag users
 * @operationId getUsrs
 * @summary Get all users
 */
export function get() {
  return db.users;
}

/**
 * @tag users
 * @operationId postUser
 * @summary Create user
 */

export function post(body: Body<UserCreateDTO>) {
  const randomUUID = crypto.randomUUID();

  const newUser = {
    id: randomUUID,
    ...body,
  };

  db.users.push(newUser);

  db.saveDb();

  return newUser;
}


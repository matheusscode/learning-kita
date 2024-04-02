import { Body, Path } from "@kitajs/runtime";
import { User, UserCreateDTO } from "../../models/user-dto";
import { db } from "../../db/db-users";
import type { HttpErrors } from "@fastify/sensible";

/**
 * @tag users
 * @operationId putUser
 * @summary Edit user
 */

export function patch(
  body: Body<Partial<UserCreateDTO>>,
  id: Path,
  error: HttpErrors
) {
  const userIndex = db.users.findIndex((user) => user.id === id);

  if (userIndex < 0) {
    throw error.notFound("Something went wrong");
  }
  const currentUser = db.users[userIndex];

  if (!currentUser) {
    throw error.notFound("Something went wrong");
  }

  const updateUser: User = {
    ...currentUser,
    age: body.age || currentUser.age,
    name: body.name || currentUser.name,
    email: body.email || currentUser.email,
  };

  db.users[userIndex] = updateUser;

  db.saveDb();

  return updateUser;
}

/**
 * @tag users
 * @operationId deleteUser
 * @summary Delete user
 */

export function Delete(id: Path, error: HttpErrors) {
  const userIndex = db.users.findIndex((user) => user.id === id);

  if (userIndex < 0) {
    throw error.notFound("Something went wrong");
  }

  db.users.splice(userIndex, 1);

  db.saveDb();

  return { id };
}

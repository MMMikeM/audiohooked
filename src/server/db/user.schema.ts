import { Generated, Insertable, Selectable, Updateable } from "kysely"

export interface UserTable {
  id: Generated<string>
  username: string
  password: string
  first_name: string | null
  last_name: string | null
  email: string | null
  created_at: Generated<Date>
}

export type UserRow = Selectable<UserTable>
export type InsertableUserRow = Insertable<UserTable>
export type UpdateableUserRow = Updateable<UserTable>

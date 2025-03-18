/* eslint-disable prettier/prettier */

import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  jsonb,
  uniqueIndex,
  uuid,
  integer,
} from "drizzle-orm/pg-core";
import { relations, SQL, sql } from "drizzle-orm";

//---------------------------------------------------------------------------------------------

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 675500 }),
  uuid: uuid().defaultRandom().notNull().unique(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  fullName: text()
    .generatedAlwaysAs(
      (): SQL => sql`${users.firstName} || ' ' || ${users.lastName}`
    )
    .notNull(),
  mobileLogStatus: boolean("mobile_log_status").default(false),
  isAdmin: boolean("is_admin"),
  isModerator: boolean("is_moderator"),
  onOfficeDuty: boolean("on_office_duty"),
  isEmergencyContact: boolean("is_emergency_contact"),
  shouldReceiveAnnouncements: boolean("should_receive_announcements"),
  idNumber: varchar("id_number", { length: 20 }),
  afmNumber: varchar("afm_number", { length: 20 }),
  amkaNumber: varchar("amka_number", { length: 20 }),
  driverLicenseNumber: varchar("driver_license_number", { length: 20 }),
  guideRegNumber: varchar("guide_reg_number", { length: 20 }),
});

//---------------------------------------------------------------------------------------------

export type User = typeof users.$inferSelect;

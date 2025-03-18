CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 675500 CACHE 1),
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"fullName" text GENERATED ALWAYS AS ("users"."firstName" || ' ' || "users"."lastName") STORED NOT NULL,
	"mobile_log_status" boolean DEFAULT false,
	"is_admin" boolean,
	"is_moderator" boolean,
	"on_office_duty" boolean,
	"is_emergency_contact" boolean,
	"should_receive_announcements" boolean,
	"id_number" varchar(20),
	"afm_number" varchar(20),
	"amka_number" varchar(20),
	"driver_license_number" varchar(20),
	"guide_reg_number" varchar(20),
	CONSTRAINT "users_uuid_unique" UNIQUE("uuid")
);

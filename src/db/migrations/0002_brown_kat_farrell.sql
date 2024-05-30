DO $$ BEGIN
 CREATE TYPE "public"."amount" AS ENUM('none', 'some', 'average', 'many');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "survey" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"in_game_nick" text NOT NULL,
	"character_level" integer NOT NULL,
	"artylery_amount" "amount" NOT NULL,
	"weapons" json DEFAULT '[]'::json NOT NULL,
	"units_low" json NOT NULL,
	CONSTRAINT "survey_user_id_unique" UNIQUE("user_id")
);

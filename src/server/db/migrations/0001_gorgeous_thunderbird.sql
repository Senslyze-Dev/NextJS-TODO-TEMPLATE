ALTER TABLE "todo-base-template_user" ALTER COLUMN "id" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "todo-base-template_user" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "todo-base-template_user" ALTER COLUMN "password" DROP NOT NULL;
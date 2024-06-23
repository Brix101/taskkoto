import { Migration } from '@mikro-orm/migrations';

export class Migration20240623071405 extends Migration {

  async up(): Promise<void> {
    this.addSql('create type "task_status" as enum (\'TODO\', \'IN_PROGRESS\', \'DONE\');');
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "full_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "bio" text null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "tasks" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "description" varchar(255) null, "status" "task_status" not null default \'TODO\', "assignee_id" int null, "created_by_id" int not null);');

    this.addSql('alter table "tasks" add constraint "tasks_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "tasks" add constraint "tasks_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tasks" drop constraint "tasks_assignee_id_foreign";');

    this.addSql('alter table "tasks" drop constraint "tasks_created_by_id_foreign";');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "tasks" cascade;');

    this.addSql('drop type "task_status";');
  }

}

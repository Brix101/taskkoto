import { Migration } from '@mikro-orm/migrations';

export class Migration20240622051006 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tasks" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "description" varchar(255) null, "status" text check ("status" in (\'TODO\', \'IN_PROGRESS\', \'DONE\')) not null default \'TODO\', "assignee_id" int null, "creator_id" int not null);');

    this.addSql('alter table "tasks" add constraint "tasks_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "tasks" add constraint "tasks_creator_id_foreign" foreign key ("creator_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "tasks" cascade;');
  }

}

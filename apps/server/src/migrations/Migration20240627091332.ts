import { Migration } from '@mikro-orm/migrations';

export class Migration20240627091332 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tasks" drop constraint "tasks_assignee_id_foreign";');

    this.addSql('alter type "task_status" add value if not exists \'BACKLOG\';');

    this.addSql('alter type "task_status" add value if not exists \'CANCELLED\';');

    this.addSql('alter table "tasks" alter column "assignee_id" type int using ("assignee_id"::int);');
    this.addSql('alter table "tasks" alter column "assignee_id" set not null;');
    this.addSql('alter table "tasks" add constraint "tasks_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tasks" drop constraint "tasks_assignee_id_foreign";');

    this.addSql('alter table "tasks" alter column "assignee_id" type int using ("assignee_id"::int);');
    this.addSql('alter table "tasks" alter column "assignee_id" drop not null;');
    this.addSql('alter table "tasks" add constraint "tasks_assignee_id_foreign" foreign key ("assignee_id") references "users" ("id") on update cascade on delete set null;');
  }

}

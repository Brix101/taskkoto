import { Migration } from '@mikro-orm/migrations';

export class Migration20240622070535 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tasks" drop constraint "tasks_creator_id_foreign";');

    this.addSql('alter table "tasks" rename column "creator_id" to "created_by_id";');
    this.addSql('alter table "tasks" add constraint "tasks_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tasks" drop constraint "tasks_created_by_id_foreign";');

    this.addSql('alter table "tasks" rename column "created_by_id" to "creator_id";');
    this.addSql('alter table "tasks" add constraint "tasks_creator_id_foreign" foreign key ("creator_id") references "users" ("id") on update cascade;');
  }

}

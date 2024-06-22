import { Migration } from '@mikro-orm/migrations';

export class Migration20240622051233 extends Migration {

  async up(): Promise<void> {
    this.addSql('create type "task_status" as enum (\'TODO\', \'IN_PROGRESS\', \'DONE\');');
    this.addSql('alter table "tasks" alter column "status" drop default;');
    this.addSql('alter table "tasks" drop constraint if exists "tasks_status_check";');

    this.addSql('alter table "tasks" alter column "status" type "task_status" using ("status"::"task_status");');

    this.addSql('alter table "tasks" alter column "status" set default \'TODO\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tasks" alter column "status" drop default;');

    this.addSql('alter table "tasks" alter column "status" type text using ("status"::text);');
    this.addSql('alter table "tasks" add constraint "tasks_status_check" check("status" in (\'TODO\', \'IN_PROGRESS\', \'DONE\'));');

    this.addSql('alter table "tasks" alter column "status" set default \'TODO\';');

    this.addSql('drop type "task_status";');
  }

}

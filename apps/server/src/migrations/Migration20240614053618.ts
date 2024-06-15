import { Migration } from '@mikro-orm/migrations';

export class Migration20240614053618 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "users" alter column "bio" drop default;');
    this.addSql('alter table "users" alter column "bio" type text using ("bio"::text);');
    this.addSql('alter table "users" alter column "bio" drop not null;');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint "users_email_unique";');

    this.addSql('alter table "users" alter column "bio" type text using ("bio"::text);');
    this.addSql('alter table "users" alter column "bio" set default \'\';');
    this.addSql('alter table "users" alter column "bio" set not null;');
  }
}

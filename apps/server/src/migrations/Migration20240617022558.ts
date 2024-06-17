import { Migration } from '@mikro-orm/migrations';

export class Migration20240617022558 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "full_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "bio" text null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}

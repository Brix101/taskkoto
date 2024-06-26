import { Migration } from '@mikro-orm/migrations';

export class Migration20240626015552 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" rename column "full_name" to "name";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" rename column "name" to "full_name";');
  }

}

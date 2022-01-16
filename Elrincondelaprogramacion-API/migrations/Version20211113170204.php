<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211113170204 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('
            create table categories(
                id int(255) auto_increment not null,
                user_id int(255),
                name varchar(255) unique not null,
                created_at datetime not null,
                updated_at datetime not null,
                constraint pk_categories primary key (id),
                constraint fk_categories_users foreign key (user_id) references users(id)
            )ENGINE=InnoDB;
        ');
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('categories');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211113161645 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('
            create table users(
                id int(255) auto_increment not null,
                nick varchar(50) unique not null,
                email varchar(50) unique not null,
                password varchar(255) not null,
                profile_image varchar(200),
                roles longtext not null,
                banned tinyint not null,
                created_at datetime not null,
                updated_at datetime not null,
                constraint pk_users primary key (id)
            )ENGINE=InnoDB;     
        ');
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('users');
    }
}

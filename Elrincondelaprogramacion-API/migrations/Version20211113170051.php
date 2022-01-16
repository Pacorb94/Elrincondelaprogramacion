<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211113170051 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('
            create table posts(
                id int(255) auto_increment not null,
                user_id int(255),
                category_id int (255),
                title varchar(255) unique not null,
                content longtext not null,
                inadequate tinyint not null,
                image varchar(200),
                created_at datetime not null,
                updated_at datetime not null,
                constraint pk_posts primary key (id),
                constraint fk_posts_users foreign key (user_id) references users(id)
            )ENGINE=InnoDB;   
        ');
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('posts');
    }
}

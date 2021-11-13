<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211113170305 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('
            create table comments(
                id int(255) auto_increment not null,
                user_id int(255),
                post_id int(255),
                content longtext not null,
                inadequate tinyint not null,
                created_at datetime not null,
                updated_at datetime not null,
                constraint pk_comments primary key (id),
                constraint fk_comments_users foreign key (user_id) references users(id),
                constraint fk_comments_posts foreign key (post_id) references posts(id)
            )ENGINE=InnoDB;  
        ');
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('comments');
    }
}

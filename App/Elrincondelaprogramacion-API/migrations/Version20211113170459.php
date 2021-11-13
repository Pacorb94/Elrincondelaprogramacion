<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use DateTime;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211113170459 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        date_default_timezone_set('Europe/Madrid');
        $this->connection->insert('users', [
            'id'=>null,
            'nick'=>'admin',
            'email'=>'admin@erp.com',
            'password'=>'$2y$10$Hu1EHKnzRf/ObTG/bjM14.bKz/abIP/3qMwgT0uMjdpYgVNDcE70.',
            'profile_image'=>null,
            'roles'=>'["ROLE_ADMIN"]',
            'banned'=>0,
            'created_at'=>date("Y-m-d H:i:s"),
            'updated_at'=>date("Y-m-d H:i:s")
        ]);
    }

    public function down(Schema $schema): void
    {
        $this->connection->delete('users', ['email'=>'admin@erp.com']);
    }
}

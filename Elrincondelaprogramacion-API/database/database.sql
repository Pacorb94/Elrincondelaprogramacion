create database if not exists `El_rincon_de_la_programacion`;
use `El_rincon_de_la_programacion`;

create table if not exists Users(
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

create table if not exists Posts(
    id int(255) auto_increment not null,
    user_id int(255),
    category_id int (255),
    title varchar(255) not null,
    content longtext not null,
    inadequate tinyint not null,
    image varchar(200),
    created_at datetime not null,
    updated_at datetime not null,
    constraint pk_posts primary key (id),
    constraint fk_posts_users foreign key (user_id) references Users(id)
)ENGINE=InnoDB;

create table if not exists Categories(
    id int(255) auto_increment not null,
    user_id int(255),
    name varchar(255) unique not null,
    created_at datetime not null,
    updated_at datetime not null,
    constraint pk_categories primary key (id),
    constraint fk_categories_users foreign key (user_id) references Users(id)
)ENGINE=InnoDB;

create table if not exists Comments(
    id int(255) auto_increment not null,
    user_id int(255),
    post_id int(255),
    content longtext not null,
    inadequate tinyint not null,
    created_at datetime not null,
    updated_at datetime not null,
    constraint pk_comments primary key (id),
    constraint fk_comments_users foreign key (user_id) references Users(id),
    constraint fk_comments_posts foreign key (post_id) references Posts(id)
)ENGINE=InnoDB;

alter table posts add constraint fk_posts_categories foreign key (category_id) references Categories(id);

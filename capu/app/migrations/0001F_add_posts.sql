create table posts (
    post_id bigserial primary key,
    title text not null, 
    subtitle text,
    body text not null, 
    display_priority integer not null default 0
);

create table post_attributes (
    post_attribute_id bigserial primary key,
    post_id bigserial references posts(post_id),
    name text not null,
    value text not null,
    display_priority integer not null default 0,

    unique(post_id, name)
);

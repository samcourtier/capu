create table planned_rides (
    planned_ride_id bigserial primary key,
    post_id bigserial references posts(post_id),
    title text not null, 
    subtitle text not null default '',
    ride_group text not null default '',
    route_title text not null default '',
    route_description text not null default '',
    start_datetime timestamp not null,
    start_location text not null,
    meetup_location text not null default '',
    expected_distance numeric,
    climbing_difficulty text not null default '',
    comments text not null default ''
);

create table planned_ride_attributes (
    planned_ride_attribute_id bigserial primary key,
    planned_ride_id bigserial references planned_rides(planned_ride_id) not null,
    name text not null,
    value text not null,
    display_priority integer not null default 0,

    unique(planned_ride_id, name)
);

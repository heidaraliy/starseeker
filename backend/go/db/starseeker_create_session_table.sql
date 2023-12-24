create table sessions (
    session_id text primary key,
    user_id text not null references users(user_id),
    created_at timestamp,
    expires_at timestamp,
    terminated_at timestamp,
    ip_address text,
    user_agent text,
    status text,
    constraint fk_user
        foreign key(user_id) 
	        references users(user_id)
);

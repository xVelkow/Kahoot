import { index, json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const sessions = pgTable('sessions', {
    sid: varchar().primaryKey(),
    sess: json().notNull(),
    expire: timestamp().notNull(),
}, sessions => {
    return {
        expireIndex: index('expire_idx').on(sessions.expire),
    }
});
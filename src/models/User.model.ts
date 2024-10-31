import { pgTable, serial, varchar, index } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    userId: serial().primaryKey(),
    userEmail: varchar().unique().notNull(),
    userPassword: varchar().notNull(),
}, users => {
    return {
        usersIndex: index('userId_idx').on(users.userId),
    }
});

export type userSelect = typeof users.$inferSelect;
export type userInsert = typeof users.$inferInsert;
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from ".";
import { orders } from "./orders";
import { products } from "./products";

export const restaurants = pgTable("restaurants", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	managerId: text("manager_id").references(() => users.id, {
		onDelete: "set null",
	}),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const restaurantRelations = relations(restaurants, ({ one, many }) => ({
	manager: one(users, {
		fields: [restaurants.managerId],
		references: [users.id],
		relationName: "restaurantManager",
	}),
	orders: many(orders),
	products: many(products),
}));

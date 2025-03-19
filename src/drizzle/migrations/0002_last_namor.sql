CREATE TABLE `schedules` (
	`id` varchar(36) NOT NULL,
	`student_id` varchar(36) NOT NULL,
	`teacher_id` varchar(36) NOT NULL,
	`scheduled_at` datetime NOT NULL,
	`status` enum('pending','canceled','confirmed','finished') NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `schedules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_student_id_users_id_fk` FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_teacher_id_users_id_fk` FOREIGN KEY (`teacher_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;
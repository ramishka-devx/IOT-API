CREATE TABLE IF NOT EXISTS `factory` (
	`factory_id` int AUTO_INCREMENT NOT NULL,
	`factory_name` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`city` varchar(100) NOT NULL,
	`state` varchar(100) NOT NULL,
	`country` varchar(100) NOT NULL,
	`postal_code` varchar(20) NOT NULL,
	`gps_coordinates` varchar(50) NOT NULL,
	`total_capacity` decimal(15,2) NOT NULL DEFAULT '000',
	`total_consumption` decimal(15,2) NOT NULL DEFAULT '000',
	`contact_person` varchar(255) NOT NULL,
	`contact_email` varchar(255) NOT NULL,
	`contact_phone` varchar(50) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_by` int NOT NULL,
	`updated_by` int NOT NULL,
	PRIMARY KEY (`factory_id`)
);

CREATE TABLE IF NOT EXISTS `division_type` (
	`division_type_id` int AUTO_INCREMENT NOT NULL,
	`type_name` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_by` int NOT NULL,
	`production` varchar(255) NOT NULL,
	PRIMARY KEY (`division_type_id`)
);

CREATE TABLE IF NOT EXISTS `division` (
	`division_id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`factory_id` int NOT NULL,
	`division_type_id` int NOT NULL,
	`parent_id` int NOT NULL,
	`level` int NOT NULL DEFAULT '1',
	`capacity` decimal(15,2) NOT NULL DEFAULT '000',
	`power_consumption` decimal(15,2) NOT NULL DEFAULT '000',
	`manager_name` varchar(255) NOT NULL,
	`manager_contact` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_by` int NOT NULL,
	`updated_by` int NOT NULL,
	PRIMARY KEY (`division_id`)
);

CREATE TABLE IF NOT EXISTS `machine` (
	`machine_id` int AUTO_INCREMENT NOT NULL,
	`division_id` int NOT NULL,
	`machine_type_id` int NOT NULL,
	`machine_name` varchar(255) NOT NULL,
	`serial_number` varchar(100) NOT NULL,
	`power_consumption` decimal(15,2) NOT NULL,
	`installation_date` date NOT NULL,
	`warranty_expiry_date` date NOT NULL,
	`last_maintenance_date` date NOT NULL,
	`next_maintenance_date` date NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_by` int NOT NULL,
	`updated_by` int NOT NULL,
	PRIMARY KEY (`machine_id`)
);

CREATE TABLE IF NOT EXISTS `iot_device_type` (
	`iot_device_type_id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(100) NOT NULL,
	`manufacturer` varchar(255) NOT NULL,
	`model` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`iot_device_type_id`)
);

CREATE TABLE IF NOT EXISTS `iot_device` (
	`iot_device_id` int AUTO_INCREMENT NOT NULL,
	`iot_device_type_id` int NOT NULL,
	`machine_id` int NOT NULL,
	`device_name` varchar(255) NOT NULL,
	`serial_number` varchar(100) NOT NULL,
	`firmware_version` varchar(50) NOT NULL,
	`installation_date` date NOT NULL,
	`last_calibration_date` date NOT NULL,
	`next_calibration_date` date NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_by` int NOT NULL,
	PRIMARY KEY (`iot_device_id`)
);

CREATE TABLE IF NOT EXISTS `parameters` (
	`parameter_id` int AUTO_INCREMENT NOT NULL,
	`iot_device_type_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`unit` varchar(50) NOT NULL,
	`min_value` decimal(15,5) NOT NULL,
	`max_value` decimal(15,5) NOT NULL,
	`normal_min` decimal(15,5) NOT NULL,
	`normal_max` decimal(15,5) NOT NULL,
	`alert_threshold` decimal(15,5) NOT NULL,
	`critical_threshold` decimal(15,5) NOT NULL,
	`description` text NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`parameter_id`)
);

CREATE TABLE IF NOT EXISTS `measured_data` (
	`measured_data_id` int AUTO_INCREMENT NOT NULL,
	`iot_device_id` int NOT NULL,
	`parameter_id` int NOT NULL,
	`measured_value` double NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`measured_data_id`)
);

CREATE TABLE IF NOT EXISTS `roles` (
	`role_id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`role_id`)
);

CREATE TABLE IF NOT EXISTS `permissions` (
	`permission_id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`resource` varchar(100) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`permission_id`)
);

CREATE TABLE IF NOT EXISTS `role_permissions` (
	`role_permission_id` int AUTO_INCREMENT NOT NULL,
	`role_id` int NOT NULL,
	`permission_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_by` int NOT NULL,
	PRIMARY KEY (`role_permission_id`)
);

CREATE TABLE IF NOT EXISTS `users` (
	`user_id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`role_id` int NOT NULL,
	`factory_id` int NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	`last_login` datetime NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_by` int NOT NULL,
	`updated_by` int NOT NULL,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `dashboard_widgets` (
	`widget_id` int AUTO_INCREMENT NOT NULL,
	`widget_name` varchar(255) NOT NULL,
	`widget_type` varchar(100) NOT NULL,
	`config` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`widget_id`)
);

CREATE TABLE IF NOT EXISTS `user_dashboard` (
	`user_dashboard_id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`widget_id` int NOT NULL,
	`position` int NOT NULL,
	`config` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`user_dashboard_id`)
);

CREATE TABLE IF NOT EXISTS `notification_types` (
	`notification_type_id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`template` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`notification_type_id`)
);

CREATE TABLE IF NOT EXISTS `notifications` (
	`notification_id` int AUTO_INCREMENT NOT NULL,
	`notification_type_id` int NOT NULL,
	`user_id` int NOT NULL,
	`message` text NOT NULL,
	`is_read` boolean NOT NULL DEFAULT false,
	`read_at` datetime NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`notification_id`)
);

ALTER TABLE `factory` ADD CONSTRAINT `factory_fk16` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`);

ALTER TABLE `factory` ADD CONSTRAINT `factory_fk17` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`);

ALTER TABLE `division` ADD CONSTRAINT `division_fk2` FOREIGN KEY (`factory_id`) REFERENCES `factory`(`factory_id`);

ALTER TABLE `division` ADD CONSTRAINT `division_fk3` FOREIGN KEY (`division_type_id`) REFERENCES `division_type`(`division_type_id`);
ALTER TABLE `machine` ADD CONSTRAINT `machine_fk1` FOREIGN KEY (`division_id`) REFERENCES `division`(`division_id`);

ALTER TABLE `machine` ADD CONSTRAINT `machine_fk12` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`);

ALTER TABLE `machine` ADD CONSTRAINT `machine_fk13` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`);

ALTER TABLE `iot_device` ADD CONSTRAINT `iot_device_fk1` FOREIGN KEY (`iot_device_type_id`) REFERENCES `iot_device_type`(`iot_device_type_id`);

ALTER TABLE `iot_device` ADD CONSTRAINT `iot_device_fk2` FOREIGN KEY (`machine_id`) REFERENCES `machine`(`machine_id`);

ALTER TABLE `iot_device` ADD CONSTRAINT `iot_device_fk11` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`);
ALTER TABLE `parameters` ADD CONSTRAINT `parameters_fk1` FOREIGN KEY (`iot_device_type_id`) REFERENCES `iot_device_type`(`iot_device_type_id`);
ALTER TABLE `measured_data` ADD CONSTRAINT `measured_data_fk1` FOREIGN KEY (`iot_device_id`) REFERENCES `iot_device`(`iot_device_id`);

ALTER TABLE `measured_data` ADD CONSTRAINT `measured_data_fk2` FOREIGN KEY (`parameter_id`) REFERENCES `parameters`(`parameter_id`);


ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_fk1` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`);

ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_fk2` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`permission_id`);

ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_fk4` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`);
ALTER TABLE `users` ADD CONSTRAINT `users_fk6` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`);

ALTER TABLE `users` ADD CONSTRAINT `users_fk12` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`);

ALTER TABLE `users` ADD CONSTRAINT `users_fk13` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`);

ALTER TABLE `user_dashboard` ADD CONSTRAINT `user_dashboard_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);

ALTER TABLE `user_dashboard` ADD CONSTRAINT `user_dashboard_fk2` FOREIGN KEY (`widget_id`) REFERENCES `dashboard_widgets`(`widget_id`);

ALTER TABLE `notifications` ADD CONSTRAINT `notifications_fk1` FOREIGN KEY (`notification_type_id`) REFERENCES `notification_types`(`notification_type_id`);

ALTER TABLE `notifications` ADD CONSTRAINT `notifications_fk2` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);
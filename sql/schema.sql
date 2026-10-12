CREATE TABLE subscriptions (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(40) NOT NULL UNIQUE,
 price_cents INT UNSIGNED NOT NULL DEFAULT 0,
 active BOOLEAN NOT NULL DEFAULT TRUE,
 created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
 updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
);
CREATE TABLE participants (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(120) NOT NULL,
 active BOOLEAN NOT NULL DEFAULT TRUE,
 created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
 updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
);
CREATE TABLE participant_subscriptions (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 participant_id INT UNSIGNED NOT NULL,
 subscription_id INT UNSIGNED NOT NULL,
 created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
 UNIQUE KEY uq_participant_subscription (participant_id, subscription_id),
 CONSTRAINT fk_ps_participant FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
 CONSTRAINT fk_ps_subscription FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE RESTRICT
);
CREATE TABLE payments (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 month CHAR(7) NOT NULL,
 participant_id INT UNSIGNED NOT NULL,
 subscription_id INT UNSIGNED NOT NULL,
 amount_cents INT UNSIGNED NOT NULL,
 status ENUM('pending','paid') NOT NULL DEFAULT 'pending',
 paid_at DATETIME NULL,
 created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
 updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
 UNIQUE KEY uq_payment_month_participant_subscription (month, participant_id, subscription_id),
 KEY idx_payments_month_status (month, status),
 CONSTRAINT fk_payment_participant FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE RESTRICT,
 CONSTRAINT fk_payment_subscription FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE RESTRICT
);

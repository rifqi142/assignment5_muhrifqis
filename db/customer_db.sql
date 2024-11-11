/*
 Navicat Premium Data Transfer

 Source Server         : postgre_server
 Source Server Type    : PostgreSQL
 Source Server Version : 110022
 Source Host           : localhost:5432
 Source Catalog        : customer_db
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 110022
 File Encoding         : 65001

 Date: 11/11/2024 22:00:46
*/


-- ----------------------------
-- Type structure for enum_orders_ord_status
-- ----------------------------
DROP TYPE IF EXISTS "public"."enum_orders_ord_status";
CREATE TYPE "public"."enum_orders_ord_status" AS ENUM (
  'pending',
  'completed',
  'cancelled'
);
ALTER TYPE "public"."enum_orders_ord_status" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for addresses_adrs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."addresses_adrs_id_seq";
CREATE SEQUENCE "public"."addresses_adrs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for contacts_cnt_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."contacts_cnt_id_seq";
CREATE SEQUENCE "public"."contacts_cnt_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for customers_cs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."customers_cs_id_seq";
CREATE SEQUENCE "public"."customers_cs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for orders_ord_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."orders_ord_id_seq";
CREATE SEQUENCE "public"."orders_ord_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for SequelizeMeta
-- ----------------------------
DROP TABLE IF EXISTS "public"."SequelizeMeta";
CREATE TABLE "public"."SequelizeMeta" (
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of SequelizeMeta
-- ----------------------------
INSERT INTO "public"."SequelizeMeta" VALUES ('20241110151914-create-customer.js');
INSERT INTO "public"."SequelizeMeta" VALUES ('20241110152004-create-address.js');
INSERT INTO "public"."SequelizeMeta" VALUES ('20241110152031-create-contact.js');
INSERT INTO "public"."SequelizeMeta" VALUES ('20241110152101-create-order.js');

-- ----------------------------
-- Table structure for addresses
-- ----------------------------
DROP TABLE IF EXISTS "public"."addresses";
CREATE TABLE "public"."addresses" (
  "adrs_id" int4 NOT NULL DEFAULT nextval('addresses_adrs_id_seq'::regclass),
  "adrs_cs_id" int4 NOT NULL,
  "adrs_street" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "adrs_city" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "adrs_state" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "adrs_postalCode" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "adrs_createdAt" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "adrs_updatedAt" timestamptz(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of addresses
-- ----------------------------
INSERT INTO "public"."addresses" VALUES (1, 12, 'S College Street', 'Burien', 'Missouri', '33589-9175', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (2, 11, 'Larry Locks', 'East Beryl', 'Montana', '50213-4610', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (3, 4, 'Marcelina Rapid', 'Lake Donavonstad', 'West Virginia', '30855', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (4, 13, 'Sipes Loop', 'Champlinside', 'Georgia', '28472-2279', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (5, 1, 'Hills Terrace', 'Noemistead', 'Pennsylvania', '34091-0609', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (6, 6, 'Megane Parkway', 'New Ethyl', 'Washington', '91232', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (7, 7, 'Beier Skyway', 'Jacobsburgh', 'Alabama', '42800-2673', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (8, 5, 'Dietrich Circle', 'Port Charlotte', 'Massachusetts', '12372-8992', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (9, 15, 'Alma Street', 'West Santosstead', 'Alabama', '57976-2871', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (10, 4, 'Keven Wall', 'St. Louis Park', 'Utah', '60545', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (11, 15, 'Tremblay Court', 'New Mossie', 'Indiana', '78220', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (12, 3, 'Rafaela Cove', 'Myrtleton', 'Alabama', '58155-7303', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (13, 8, 'Towne Meadows', 'Duluth', 'Mississippi', '25088', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (14, 8, 'Pagac Lane', 'Lake Jackfort', 'Idaho', '22036-2592', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');
INSERT INTO "public"."addresses" VALUES (15, 1, 'Hamill Tunnel', 'East Verdieland', 'Montana', '85336', '2024-11-11 21:59:50.52+07', '2024-11-11 21:59:50.52+07');

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS "public"."contacts";
CREATE TABLE "public"."contacts" (
  "cnt_id" int4 NOT NULL DEFAULT nextval('contacts_cnt_id_seq'::regclass),
  "cnt_cs_id" int4 NOT NULL,
  "cnt_phone" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "cnt_fax" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "cnt_createdAt" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "cnt_updatedAt" timestamptz(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of contacts
-- ----------------------------
INSERT INTO "public"."contacts" VALUES (1, 6, '1-919-869-3757 x86331', '681.562.4056', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (2, 9, '(628) 223-1266', '1-751-899-0170 x21577', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (3, 4, '535-591-1901 x547', '682.730.8425 x755', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (4, 6, '668-806-2902 x633', '(718) 332-1794', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (5, 10, '608.277.5743 x77904', '326.693.5213 x06316', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (6, 14, '(659) 683-9724', '985.228.8999 x22969', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (7, 13, '817-736-9900 x8841', '(747) 949-0539 x49030', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (8, 2, '733-363-2596 x06857', '982.597.0706 x515', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (9, 7, '920-940-4788', '381-858-8981 x397', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (10, 6, '746-525-4691 x0295', '(762) 901-9243', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (11, 15, '485-591-6229 x8870', '(907) 267-4070 x465', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (12, 5, '(553) 710-7453', '204-756-5078 x6274', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (13, 15, '312.678.6195 x620', '538.991.1473', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (14, 15, '(545) 427-2932', '(939) 418-1150 x4327', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');
INSERT INTO "public"."contacts" VALUES (15, 15, '1-293-436-3914', '814.521.2139 x004', '2024-11-11 21:59:50.526+07', '2024-11-11 21:59:50.526+07');

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS "public"."customers";
CREATE TABLE "public"."customers" (
  "cs_id" int4 NOT NULL DEFAULT nextval('customers_cs_id_seq'::regclass),
  "cs_fullName" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "cs_email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "cs_gender" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "cs_birthDate" timestamptz(6) NOT NULL,
  "cs_is_active" bool DEFAULT true,
  "cs_createdAt" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "cs_updatedAt" timestamptz(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO "public"."customers" VALUES (1, 'Rochelle Swift', 'Price19@hotmail.com', 'Female', '1952-03-29 15:52:09.456+07', 't', '2024-11-11 21:59:50.508+07', '2024-11-11 21:59:50.508+07');
INSERT INTO "public"."customers" VALUES (2, 'Daryl Bosco', 'Dasia51@yahoo.com', 'Male', '1984-06-23 10:29:57.709+07', 't', '2024-11-11 21:59:50.509+07', '2024-11-11 21:59:50.509+07');
INSERT INTO "public"."customers" VALUES (3, 'Virgil Tremblay', 'Godfrey_Leffler@hotmail.com', 'Male', '1971-03-09 03:45:53.301+07', 't', '2024-11-11 21:59:50.509+07', '2024-11-11 21:59:50.509+07');
INSERT INTO "public"."customers" VALUES (4, 'Don Mraz', 'Alexandrea84@yahoo.com', 'Female', '1983-03-26 01:46:28.699+07', 't', '2024-11-11 21:59:50.509+07', '2024-11-11 21:59:50.509+07');
INSERT INTO "public"."customers" VALUES (5, 'Maryann Hermiston-Monahan', 'Houston85@yahoo.com', 'Male', '1995-12-01 03:26:00.559+07', 't', '2024-11-11 21:59:50.509+07', '2024-11-11 21:59:50.509+07');
INSERT INTO "public"."customers" VALUES (6, 'Tasha Anderson', 'Frederique90@yahoo.com', 'Female', '1986-08-31 17:36:41.161+07', 't', '2024-11-11 21:59:50.509+07', '2024-11-11 21:59:50.509+07');
INSERT INTO "public"."customers" VALUES (7, 'Marsha Trantow', 'Kameron_Kunze69@yahoo.com', 'Female', '1982-03-06 17:00:05.481+07', 't', '2024-11-11 21:59:50.509+07', '2024-11-11 21:59:50.509+07');
INSERT INTO "public"."customers" VALUES (8, 'Jenna Stehr', 'Sonya16@yahoo.com', 'Male', '1992-10-02 16:35:01.089+07', 't', '2024-11-11 21:59:50.509+07', '2024-11-11 21:59:50.509+07');
INSERT INTO "public"."customers" VALUES (9, 'Nancy Stanton-Bode', 'Gabriel_McCullough@yahoo.com', 'Male', '1947-05-29 09:42:39.541+07', 't', '2024-11-11 21:59:50.51+07', '2024-11-11 21:59:50.51+07');
INSERT INTO "public"."customers" VALUES (10, 'Cathy Rogahn', 'Katelin44@hotmail.com', 'Male', '1949-08-31 09:55:47.067+07', 't', '2024-11-11 21:59:50.51+07', '2024-11-11 21:59:50.51+07');
INSERT INTO "public"."customers" VALUES (11, 'Felicia Davis', 'Mireille.Friesen20@gmail.com', 'Male', '1965-10-31 07:13:33.681+07', 't', '2024-11-11 21:59:50.51+07', '2024-11-11 21:59:50.51+07');
INSERT INTO "public"."customers" VALUES (12, 'Ana Schiller', 'Alberta14@yahoo.com', 'Female', '1964-05-09 20:43:40.643+07', 't', '2024-11-11 21:59:50.51+07', '2024-11-11 21:59:50.51+07');
INSERT INTO "public"."customers" VALUES (13, 'Nicolas Hamill', 'Alessandro_Veum11@yahoo.com', 'Male', '1986-02-10 14:36:35.566+07', 't', '2024-11-11 21:59:50.51+07', '2024-11-11 21:59:50.51+07');
INSERT INTO "public"."customers" VALUES (14, 'Preston Berge', 'Eldon7@gmail.com', 'Male', '1980-11-11 13:08:53.299+07', 't', '2024-11-11 21:59:50.51+07', '2024-11-11 21:59:50.51+07');
INSERT INTO "public"."customers" VALUES (15, 'Ms. Vicki Mohr', 'Marilie_Klocko@hotmail.com', 'Female', '1990-05-07 03:04:46.723+07', 't', '2024-11-11 21:59:50.51+07', '2024-11-11 21:59:50.51+07');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS "public"."orders";
CREATE TABLE "public"."orders" (
  "ord_id" int4 NOT NULL DEFAULT nextval('orders_ord_id_seq'::regclass),
  "ord_cs_id" int4 NOT NULL,
  "ord_date" timestamptz(6) NOT NULL,
  "ord_status" "public"."enum_orders_ord_status" NOT NULL,
  "ord_totalAmount" numeric(10,2) NOT NULL,
  "ord_createdAt" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "ord_updatedAt" timestamptz(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO "public"."orders" VALUES (1, 3, '2024-11-11 15:05:13.357+07', 'pending', 865.49, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (2, 13, '2024-11-11 03:57:50.912+07', 'cancelled', 213.59, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (3, 7, '2024-11-11 15:08:39.585+07', 'pending', 721.19, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (4, 8, '2024-11-11 13:52:29.405+07', 'pending', 649.00, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (5, 4, '2024-11-11 09:59:55.699+07', 'pending', 680.30, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (6, 5, '2024-11-11 03:10:16.732+07', 'pending', 188.55, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (7, 12, '2024-11-11 13:50:34.123+07', 'pending', 712.89, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (8, 12, '2024-11-11 07:57:43.921+07', 'completed', 444.35, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (9, 8, '2024-11-11 17:48:23.998+07', 'completed', 758.45, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (10, 14, '2024-11-11 19:49:01.259+07', 'pending', 297.45, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (11, 2, '2024-11-11 08:45:47.037+07', 'cancelled', 477.19, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (12, 6, '2024-11-11 19:59:42.984+07', 'completed', 820.79, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (13, 13, '2024-11-11 14:07:25.154+07', 'cancelled', 312.39, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (14, 1, '2024-11-11 10:57:04.719+07', 'completed', 506.09, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');
INSERT INTO "public"."orders" VALUES (15, 10, '2024-11-11 10:17:16.863+07', 'cancelled', 657.50, '2024-11-11 21:59:50.533+07', '2024-11-11 21:59:50.533+07');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."addresses_adrs_id_seq"
OWNED BY "public"."addresses"."adrs_id";
SELECT setval('"public"."addresses_adrs_id_seq"', 16, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."contacts_cnt_id_seq"
OWNED BY "public"."contacts"."cnt_id";
SELECT setval('"public"."contacts_cnt_id_seq"', 16, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."customers_cs_id_seq"
OWNED BY "public"."customers"."cs_id";
SELECT setval('"public"."customers_cs_id_seq"', 16, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."orders_ord_id_seq"
OWNED BY "public"."orders"."ord_id";
SELECT setval('"public"."orders_ord_id_seq"', 16, true);

-- ----------------------------
-- Primary Key structure for table SequelizeMeta
-- ----------------------------
ALTER TABLE "public"."SequelizeMeta" ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name");

-- ----------------------------
-- Primary Key structure for table addresses
-- ----------------------------
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("adrs_id");

-- ----------------------------
-- Primary Key structure for table contacts
-- ----------------------------
ALTER TABLE "public"."contacts" ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("cnt_id");

-- ----------------------------
-- Uniques structure for table customers
-- ----------------------------
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_cs_email_key" UNIQUE ("cs_email");

-- ----------------------------
-- Primary Key structure for table customers
-- ----------------------------
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("cs_id");

-- ----------------------------
-- Primary Key structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("ord_id");

-- ----------------------------
-- Foreign Keys structure for table addresses
-- ----------------------------
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_adrs_cs_id_fkey" FOREIGN KEY ("adrs_cs_id") REFERENCES "public"."customers" ("cs_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table contacts
-- ----------------------------
ALTER TABLE "public"."contacts" ADD CONSTRAINT "contacts_cnt_cs_id_fkey" FOREIGN KEY ("cnt_cs_id") REFERENCES "public"."customers" ("cs_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_ord_cs_id_fkey" FOREIGN KEY ("ord_cs_id") REFERENCES "public"."customers" ("cs_id") ON DELETE CASCADE ON UPDATE CASCADE;

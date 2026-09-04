/*
 Navicat Premium Data Transfer

 Source Server         : food
 Source Server Type    : MySQL
 Source Server Version : 80044
 Source Host           : localhost:3306
 Source Schema         : restaurant_order

 Target Server Type    : MySQL
 Target Server Version : 80044
 File Encoding         : 65001

 Date: 22/06/2026 00:35:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', '123456', '2026-05-08 23:24:11');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int(0) NULL DEFAULT 0,
  `status` tinyint(0) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '热销推荐', 1, 1, '2026-05-08 23:24:11');
INSERT INTO `category` VALUES (2, '招牌烧腊', 2, 1, '2026-05-08 23:24:11');
INSERT INTO `category` VALUES (4, '热菜', 4, 1, '2026-05-08 23:24:11');
INSERT INTO `category` VALUES (5, '炖汤', 5, 1, '2026-05-08 23:24:11');
INSERT INTO `category` VALUES (6, '主食', 6, 1, '2026-05-08 23:24:11');
INSERT INTO `category` VALUES (7, '饮品', 7, 1, '2026-05-08 23:24:11');
INSERT INTO `category` VALUES (8, '素菜', 8, 1, '2026-05-10 01:32:19');
INSERT INTO `category` VALUES (9, '甜品点心', 9, 1, '2026-05-10 01:37:26');

-- ----------------------------
-- Table structure for dish
-- ----------------------------
DROP TABLE IF EXISTS `dish`;
CREATE TABLE `dish`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `category_id` int(0) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `sales` int(0) NULL DEFAULT 0,
  `is_hot` tinyint(0) NULL DEFAULT 0,
  `is_recommend` tinyint(0) NULL DEFAULT 0,
  `status` tinyint(0) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dish
-- ----------------------------
INSERT INTO `dish` VALUES (1, 1, '明炉烧鸭', 78.00, 'http://10.125.218.185:3000/uploads/dishes/1780906779070.jpg', '本店招牌菜，外酥里嫩', 127, 1, 1, 1, '2026-05-08 23:24:11');
INSERT INTO `dish` VALUES (2, 4, '红烧肉', 58.00, 'http://10.125.218.185:3000/uploads/dishes/1780906714512.jpg', '肥而不腻，入口即化', 99, 1, 1, 1, '2026-05-08 23:24:11');
INSERT INTO `dish` VALUES (3, 8, '拍黄瓜', 18.00, 'http://127.0.0.1:3000/uploads/dishes/1780906665313.webp', '清爽开胃', 62, 0, 1, 1, '2026-05-08 23:24:11');
INSERT INTO `dish` VALUES (4, 4, '鱼香肉丝', 38.00, 'http://10.125.218.185:3000/uploads/dishes/1780906620719.jpg', '经典川味家常菜', 83, 1, 0, 1, '2026-05-08 23:24:11');
INSERT INTO `dish` VALUES (5, 5, '玉米排骨汤', 48.00, 'http://10.125.218.185:3000/uploads/dishes/1780906581850.jpg', '汤鲜味美', 58, 0, 1, 1, '2026-05-08 23:24:11');
INSERT INTO `dish` VALUES (6, 6, '扬州炒饭', 28.00, 'http://10.125.218.185:3000/uploads/dishes/1780906549374.webp', '粒粒分明，香味十足', 80, 1, 1, 1, '2026-05-08 23:24:11');
INSERT INTO `dish` VALUES (7, 7, '酸梅汤', 6.00, 'http://10.125.218.185:3000/uploads/dishes/1780906517802.jpg', '解腻爽口', 101, 0, 0, 1, '2026-05-08 23:24:11');
INSERT INTO `dish` VALUES (8, 2, '金牌烧鹅', 128.00, 'http://10.125.218.185:3000/uploads/dishes/1780906479633.jpg', '皮脆肉嫩，粤式经典烧味', 3, 1, 1, 1, '2026-05-10 01:15:16');
INSERT INTO `dish` VALUES (9, 1, '金牌脆皮乳鸽', 68.00, 'http://10.125.218.185:3000/uploads/dishes/1780906433942.jpg', '外皮酥脆，肉质鲜嫩', 6, 1, 1, 1, '2026-05-10 01:15:50');
INSERT INTO `dish` VALUES (10, 2, '鸿运当头乳猪拼盘', 128.00, 'http://10.125.218.185:3000/uploads/dishes/1780906383862.jpg', '经典头盘，寓意吉祥', 3, 1, 1, 1, '2026-05-10 01:17:27');
INSERT INTO `dish` VALUES (11, 2, '蜜汁叉烧', 58.00, 'http://10.125.218.185:3000/uploads/dishes/1780906334883.jpg', '肥瘦适中，甜香入味', 3, 1, 1, 1, '2026-05-10 01:18:16');
INSERT INTO `dish` VALUES (12, 2, '卤水拼盘', 78.00, 'http://10.125.218.185:3000/uploads/dishes/1780906287008.webp', '多款卤味组合，适合下酒', 3, 0, 1, 1, '2026-05-10 01:20:40');
INSERT INTO `dish` VALUES (13, 2, '清远白切鸡', 78.00, 'http://10.125.218.185:3000/uploads/dishes/1780904522358.jpg', '鸡肉嫩滑，搭配姜葱汁', 6, 1, 1, 1, '2026-05-10 01:21:18');
INSERT INTO `dish` VALUES (14, 2, '豉油皇乳鸽', 68.00, 'http://10.125.218.185:3000/uploads/dishes/1780904486580.webp', '咸香浓郁，肉质紧实', 5, 1, 1, 1, '2026-05-10 01:21:45');
INSERT INTO `dish` VALUES (15, 4, '黑椒牛仔骨', 58.00, 'http://10.125.218.185:3000/uploads/dishes/1780904421832.jpg', '黑椒香浓，肉质鲜嫩', 0, 1, 1, 1, '2026-05-10 01:22:34');
INSERT INTO `dish` VALUES (16, 1, '菠萝咕噜肉', 48.00, 'http://10.125.218.185:3000/uploads/dishes/1780904383232.webp', '酸甜开胃，老少皆宜', 6, 0, 1, 1, '2026-05-10 01:22:56');
INSERT INTO `dish` VALUES (17, 4, '腰果炒虾仁', 28.00, 'http://10.125.218.185:3000/uploads/dishes/1780904342604.jpg', '虾仁爽口，腰果香脆', 2, 0, 1, 1, '2026-05-10 01:23:25');
INSERT INTO `dish` VALUES (18, 4, 'XO酱炒花枝片', 28.00, 'http://10.125.218.185:3000/uploads/dishes/1780904295110.jpg', '酱香浓郁，口感爽脆', 1, 1, 1, 1, '2026-05-10 01:23:40');
INSERT INTO `dish` VALUES (19, 4, '沙茶牛肉煲', 58.00, 'http://10.125.218.185:3000/uploads/dishes/1780904240285.webp', '沙茶味浓，热气腾腾', 3, 1, 1, 1, '2026-05-10 01:26:56');
INSERT INTO `dish` VALUES (20, 4, '梅菜扣肉', 48.00, 'http://10.125.218.185:3000/uploads/dishes/1780904184662.jpg', '肥而不腻，经典家常菜', 1, 0, 1, 1, '2026-05-10 01:27:31');
INSERT INTO `dish` VALUES (21, 4, '干锅有机花菜', 26.00, 'http://10.125.218.185:3000/uploads/dishes/1780904154058.jpg', '香辣爽口，锅气十足', 1, 0, 1, 1, '2026-05-10 01:28:59');
INSERT INTO `dish` VALUES (22, 4, '鱼香茄子煲', 32.00, 'http://10.125.218.185:3000/uploads/dishes/1780904115078.webp', '酱香浓郁，下饭推荐', 5, 0, 1, 1, '2026-05-10 01:29:18');
INSERT INTO `dish` VALUES (23, 5, '花胶炖鸡汤', 88.00, 'http://10.125.218.185:3000/uploads/dishes/1780904073250.jpg', '滋补养颜，汤味醇厚', 1, 1, 1, 1, '2026-05-10 01:30:01');
INSERT INTO `dish` VALUES (24, 5, '西湖牛肉羹', 38.00, 'http://10.125.218.185:3000/uploads/dishes/1780904028087.jpg', '鲜香顺滑，老少皆宜', 1, 1, 1, 1, '2026-05-10 01:30:27');
INSERT INTO `dish` VALUES (25, 5, '虫草花炖乌鸡', 78.00, 'http://10.125.218.185:3000/uploads/dishes/1780903984420.jpg', '汤色金黄，营养丰富', 1, 0, 1, 1, '2026-05-10 01:30:52');
INSERT INTO `dish` VALUES (26, 5, '五指毛桃炖鸡', 68.00, 'http://10.125.218.185:3000/uploads/dishes/1780903949980.jpg', '滋补养颜，汤味醇厚', 3, 0, 1, 1, '2026-05-10 01:31:31');
INSERT INTO `dish` VALUES (27, 8, '上汤娃娃菜', 18.00, 'http://10.125.218.185:3000/uploads/dishes/1780903887891.webp', '汤鲜菜嫩，清淡可口', 1, 0, 1, 1, '2026-05-10 01:32:49');
INSERT INTO `dish` VALUES (28, 8, '蒜蓉炒时蔬', 16.00, 'http://10.125.218.185:3000/uploads/dishes/1780903851133.jpg', '简单清香，搭配均衡', 2, 1, 1, 1, '2026-05-10 01:33:06');
INSERT INTO `dish` VALUES (29, 8, '蚝油生菜', 18.00, 'http://10.125.218.185:3000/uploads/dishes/1780903817184.webp', '经典粤式素菜', 0, 1, 1, 1, '2026-05-10 01:33:33');
INSERT INTO `dish` VALUES (30, 8, '鲜菇扒西兰花', 36.00, 'http://10.125.218.185:3000/uploads/dishes/1780903755697.jpg', '鲜香清爽，颜色美观', 3, 0, 1, 1, '2026-05-10 01:33:56');
INSERT INTO `dish` VALUES (31, 1, '荷塘小炒', 32.00, 'http://10.125.218.185:3000/uploads/dishes/1780903709025.jpg', '莲藕、木耳、荷兰豆清爽搭配', 10, 1, 1, 1, '2026-05-10 01:34:33');
INSERT INTO `dish` VALUES (32, 6, '干炒牛河', 36.00, 'http://10.125.218.185:3000/uploads/dishes/1780903530267.jpg', '锅气十足，粤式经典', 4, 1, 1, 1, '2026-05-10 01:35:05');
INSERT INTO `dish` VALUES (33, 6, '海鲜炒面', 38.00, 'http://10.125.218.185:3000/uploads/dishes/1780903479980.jpg', '海鲜鲜香，面条爽口', 3, 0, 1, 1, '2026-05-10 01:35:27');
INSERT INTO `dish` VALUES (34, 9, '鲜肉烧卖', 22.00, 'http://10.125.218.185:3000/uploads/dishes/1780892809950.jpg', '皮薄馅足，肉味鲜美', 3, 0, 1, 1, '2026-05-10 01:39:39');
INSERT INTO `dish` VALUES (35, 9, '水晶虾饺', 24.00, 'http://10.125.218.185:3000/uploads/dishes/1780892765114.jpg', '晶莹剔透，广式早茶代表', 4, 1, 1, 1, '2026-05-10 01:39:55');
INSERT INTO `dish` VALUES (36, 9, '叉烧包', 20.00, 'http://10.125.218.185:3000/uploads/dishes/1780892726346.jpg', '松软香甜，内馅浓郁', 2, 0, 1, 1, '2026-05-10 01:40:19');
INSERT INTO `dish` VALUES (37, 9, '流沙包', 18.00, 'http://10.125.218.185:3000/uploads/dishes/1780892682311.avif', '奶黄流心，甜而不腻', 0, 0, 1, 1, '2026-05-10 01:40:59');
INSERT INTO `dish` VALUES (38, 7, '菊花茶', 3.00, 'http://10.125.218.185:3000/uploads/dishes/1780892615951.webp', '清香淡雅，适合聚餐', 3, 0, 1, 1, '2026-05-10 01:41:43');
INSERT INTO `dish` VALUES (39, 7, '柠檬茶', 6.00, 'http://10.125.218.185:3000/uploads/dishes/1780892392357.png', '清爽解腻', 3, 1, 1, 1, '2026-05-10 01:42:09');
INSERT INTO `dish` VALUES (40, 9, '双皮奶', 13.00, 'http://10.125.218.185:3000/uploads/dishes/1780892340447.webp', '奶香浓郁，口感嫩滑', 6, 1, 1, 1, '2026-05-10 01:42:34');
INSERT INTO `dish` VALUES (41, 7, '椰汁西米露', 7.00, 'http://127.0.0.1:3000/uploads/dishes/1780892228071.jpg', '清甜顺滑', 0, 1, 1, 1, '2026-05-10 01:42:54');
INSERT INTO `dish` VALUES (42, 7, '绿豆沙', 7.00, 'http://127.0.0.1:3000/uploads/dishes/1780892112441.jpg', '香甜软糯，饭后甜品', 1, 1, 1, 1, '2026-05-10 01:43:35');
INSERT INTO `dish` VALUES (43, 7, '杨枝甘露', 8.00, 'http://127.0.0.1:3000/uploads/dishes/1780892036280.webp', '港式经典饮品', 3, 1, 1, 1, '2026-05-10 01:44:27');
INSERT INTO `dish` VALUES (44, 6, '白米饭', 2.00, 'http://10.125.218.185:3000/uploads/dishes/1780891686651.jpg', '严选五常大米', 21, 0, 1, 1, '2026-05-10 01:47:28');

-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `order_id` int(0) NOT NULL,
  `dish_id` int(0) NOT NULL,
  `dish_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `quantity` int(0) NOT NULL,
  `subtotal` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 126 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_item
-- ----------------------------
INSERT INTO `order_item` VALUES (1, 1, 7, '酸梅汤', 12.00, 1, 12.00);
INSERT INTO `order_item` VALUES (2, 1, 6, '扬州炒饭', 28.00, 1, 28.00);
INSERT INTO `order_item` VALUES (3, 1, 5, '玉米排骨汤', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (4, 1, 4, '鱼香肉丝', 38.00, 1, 38.00);
INSERT INTO `order_item` VALUES (5, 2, 1, '招牌烤鸭', 88.00, 1, 88.00);
INSERT INTO `order_item` VALUES (6, 2, 2, '红烧肉', 58.00, 2, 116.00);
INSERT INTO `order_item` VALUES (7, 3, 1, '招牌烤鸭', 88.00, 1, 88.00);
INSERT INTO `order_item` VALUES (8, 3, 2, '红烧肉', 58.00, 1, 58.00);
INSERT INTO `order_item` VALUES (9, 4, 1, '招牌烤鸭', 88.00, 1, 88.00);
INSERT INTO `order_item` VALUES (10, 5, 1, '招牌烤鸭', 88.00, 1, 88.00);
INSERT INTO `order_item` VALUES (11, 6, 6, '扬州炒饭', 28.00, 1, 28.00);
INSERT INTO `order_item` VALUES (12, 6, 5, '玉米排骨汤', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (13, 7, 3, '拍黄瓜', 18.00, 1, 18.00);
INSERT INTO `order_item` VALUES (14, 8, 32, '干炒牛河', 58.00, 1, 58.00);
INSERT INTO `order_item` VALUES (15, 8, 28, '蒜蓉炒时蔬', 38.00, 1, 38.00);
INSERT INTO `order_item` VALUES (16, 8, 14, '豉油皇乳鸽', 72.00, 1, 72.00);
INSERT INTO `order_item` VALUES (17, 8, 22, '鱼香茄子煲', 52.00, 1, 52.00);
INSERT INTO `order_item` VALUES (18, 8, 19, '沙茶牛肉煲', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (19, 8, 18, 'XO酱炒花枝片', 88.00, 1, 88.00);
INSERT INTO `order_item` VALUES (20, 8, 43, '杨枝甘露', 28.00, 1, 28.00);
INSERT INTO `order_item` VALUES (21, 8, 38, '菊花茶', 12.00, 1, 12.00);
INSERT INTO `order_item` VALUES (22, 8, 35, '水晶虾饺', 42.00, 1, 42.00);
INSERT INTO `order_item` VALUES (23, 8, 34, '鲜肉烧卖', 32.00, 1, 32.00);
INSERT INTO `order_item` VALUES (24, 9, 31, '荷塘小炒', 52.00, 1, 52.00);
INSERT INTO `order_item` VALUES (25, 10, 31, '荷塘小炒', 52.00, 1, 52.00);
INSERT INTO `order_item` VALUES (26, 11, 40, '双皮奶', 26.00, 1, 26.00);
INSERT INTO `order_item` VALUES (27, 11, 30, '鲜菇扒西兰花', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (28, 11, 44, '白米饭', 4.00, 1, 4.00);
INSERT INTO `order_item` VALUES (29, 11, 26, '五指毛桃炖鸡', 88.00, 1, 88.00);
INSERT INTO `order_item` VALUES (30, 11, 22, '鱼香茄子煲', 52.00, 1, 52.00);
INSERT INTO `order_item` VALUES (31, 11, 19, '沙茶牛肉煲', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (32, 11, 14, '豉油皇乳鸽', 72.00, 1, 72.00);
INSERT INTO `order_item` VALUES (33, 11, 13, '清远白切鸡', 98.00, 1, 98.00);
INSERT INTO `order_item` VALUES (34, 12, 31, '荷塘小炒', 52.00, 1, 52.00);
INSERT INTO `order_item` VALUES (35, 12, 12, '卤水拼盘', 88.00, 1, 88.00);
INSERT INTO `order_item` VALUES (36, 12, 11, '蜜汁叉烧', 58.00, 1, 58.00);
INSERT INTO `order_item` VALUES (37, 12, 3, '拍黄瓜', 18.00, 1, 18.00);
INSERT INTO `order_item` VALUES (38, 12, 24, '西湖牛肉羹', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (39, 12, 44, '白米饭', 4.00, 5, 20.00);
INSERT INTO `order_item` VALUES (40, 13, 31, '荷塘小炒', 52.00, 1, 52.00);
INSERT INTO `order_item` VALUES (41, 13, 14, '豉油皇乳鸽', 72.00, 1, 72.00);
INSERT INTO `order_item` VALUES (42, 14, 13, '清远白切鸡', 98.00, 1, 98.00);
INSERT INTO `order_item` VALUES (43, 14, 10, '鸿运当头乳猪拼盘', 268.00, 1, 268.00);
INSERT INTO `order_item` VALUES (44, 14, 9, '金牌脆皮乳鸽', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (45, 14, 8, '金牌烧鹅', 128.00, 1, 128.00);
INSERT INTO `order_item` VALUES (46, 14, 25, '虫草花炖乌鸡', 118.00, 1, 118.00);
INSERT INTO `order_item` VALUES (47, 14, 43, '杨枝甘露', 28.00, 1, 28.00);
INSERT INTO `order_item` VALUES (48, 14, 39, '柠檬茶', 18.00, 1, 18.00);
INSERT INTO `order_item` VALUES (49, 15, 31, '荷塘小炒', 52.00, 1, 52.00);
INSERT INTO `order_item` VALUES (50, 15, 23, '花胶炖鸡汤', 128.00, 1, 128.00);
INSERT INTO `order_item` VALUES (51, 15, 11, '蜜汁叉烧', 58.00, 1, 58.00);
INSERT INTO `order_item` VALUES (52, 15, 10, '鸿运当头乳猪拼盘', 268.00, 1, 268.00);
INSERT INTO `order_item` VALUES (53, 15, 9, '金牌脆皮乳鸽', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (54, 15, 8, '金牌烧鹅', 128.00, 1, 128.00);
INSERT INTO `order_item` VALUES (55, 15, 33, '海鲜炒面', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (56, 15, 32, '干炒牛河', 58.00, 1, 58.00);
INSERT INTO `order_item` VALUES (57, 16, 31, '荷塘小炒', 32.00, 1, 32.00);
INSERT INTO `order_item` VALUES (58, 16, 26, '五指毛桃炖鸡', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (59, 16, 16, '菠萝咕噜肉', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (60, 16, 9, '金牌脆皮乳鸽', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (61, 16, 1, '明炉烧鸭', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (62, 16, 32, '干炒牛河', 36.00, 1, 36.00);
INSERT INTO `order_item` VALUES (63, 17, 46, '蒜泥白肉', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (64, 18, 13, '清远白切鸡', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (65, 18, 12, '卤水拼盘', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (66, 18, 11, '蜜汁叉烧', 58.00, 1, 58.00);
INSERT INTO `order_item` VALUES (67, 18, 43, '杨枝甘露', 18.00, 1, 18.00);
INSERT INTO `order_item` VALUES (68, 18, 5, '玉米排骨汤', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (69, 18, 36, '叉烧包', 20.00, 1, 20.00);
INSERT INTO `order_item` VALUES (70, 18, 35, '水晶虾饺', 24.00, 1, 24.00);
INSERT INTO `order_item` VALUES (71, 18, 44, '白米饭', 2.00, 5, 10.00);
INSERT INTO `order_item` VALUES (72, 18, 27, '上汤娃娃菜', 18.00, 1, 18.00);
INSERT INTO `order_item` VALUES (73, 19, 46, '蒜泥白肉', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (74, 19, 22, '鱼香茄子煲', 32.00, 1, 32.00);
INSERT INTO `order_item` VALUES (75, 19, 21, '干锅有机花菜', 26.00, 1, 26.00);
INSERT INTO `order_item` VALUES (76, 19, 19, '沙茶牛肉煲', 58.00, 1, 58.00);
INSERT INTO `order_item` VALUES (77, 19, 17, '腰果炒虾仁', 28.00, 1, 28.00);
INSERT INTO `order_item` VALUES (78, 19, 4, '鱼香肉丝', 38.00, 1, 38.00);
INSERT INTO `order_item` VALUES (79, 19, 2, '红烧肉', 58.00, 1, 58.00);
INSERT INTO `order_item` VALUES (80, 19, 44, '白米饭', 2.00, 7, 14.00);
INSERT INTO `order_item` VALUES (81, 19, 30, '鲜菇扒西兰花', 36.00, 1, 36.00);
INSERT INTO `order_item` VALUES (82, 19, 28, '蒜蓉炒时蔬', 16.00, 1, 16.00);
INSERT INTO `order_item` VALUES (83, 19, 34, '鲜肉烧卖', 22.00, 2, 44.00);
INSERT INTO `order_item` VALUES (84, 19, 35, '水晶虾饺', 24.00, 2, 48.00);
INSERT INTO `order_item` VALUES (85, 19, 13, '清远白切鸡', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (86, 19, 12, '卤水拼盘', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (87, 19, 8, '金牌烧鹅', 128.00, 1, 128.00);
INSERT INTO `order_item` VALUES (88, 19, 10, '鸿运当头乳猪拼盘', 128.00, 1, 128.00);
INSERT INTO `order_item` VALUES (89, 20, 14, '豉油皇乳鸽', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (90, 20, 13, '清远白切鸡', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (91, 20, 22, '鱼香茄子煲', 32.00, 1, 32.00);
INSERT INTO `order_item` VALUES (92, 20, 4, '鱼香肉丝', 38.00, 1, 38.00);
INSERT INTO `order_item` VALUES (93, 20, 33, '海鲜炒面', 38.00, 1, 38.00);
INSERT INTO `order_item` VALUES (94, 20, 6, '扬州炒饭', 28.00, 1, 28.00);
INSERT INTO `order_item` VALUES (95, 21, 9, '金牌脆皮乳鸽', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (96, 22, 6, '扬州炒饭', 28.00, 1, 28.00);
INSERT INTO `order_item` VALUES (97, 22, 30, '鲜菇扒西兰花', 36.00, 1, 36.00);
INSERT INTO `order_item` VALUES (98, 22, 40, '双皮奶', 13.00, 3, 39.00);
INSERT INTO `order_item` VALUES (99, 22, 22, '鱼香茄子煲', 32.00, 1, 32.00);
INSERT INTO `order_item` VALUES (100, 23, 16, '菠萝咕噜肉', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (101, 23, 1, '明炉烧鸭', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (102, 23, 26, '五指毛桃炖鸡', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (103, 23, 20, '梅菜扣肉', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (104, 23, 17, '腰果炒虾仁', 28.00, 1, 28.00);
INSERT INTO `order_item` VALUES (105, 23, 38, '菊花茶', 3.00, 1, 3.00);
INSERT INTO `order_item` VALUES (106, 23, 39, '柠檬茶', 6.00, 1, 6.00);
INSERT INTO `order_item` VALUES (107, 23, 32, '干炒牛河', 36.00, 1, 36.00);
INSERT INTO `order_item` VALUES (108, 24, 40, '双皮奶', 13.00, 2, 26.00);
INSERT INTO `order_item` VALUES (109, 24, 36, '叉烧包', 20.00, 1, 20.00);
INSERT INTO `order_item` VALUES (110, 24, 31, '荷塘小炒', 32.00, 1, 32.00);
INSERT INTO `order_item` VALUES (111, 24, 16, '菠萝咕噜肉', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (112, 24, 1, '明炉烧鸭', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (113, 24, 45, '凉拌猪耳', 58.00, 1, 58.00);
INSERT INTO `order_item` VALUES (114, 25, 31, '荷塘小炒', 32.00, 1, 32.00);
INSERT INTO `order_item` VALUES (115, 25, 16, '菠萝咕噜肉', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (116, 25, 14, '豉油皇乳鸽', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (117, 25, 13, '清远白切鸡', 78.00, 1, 78.00);
INSERT INTO `order_item` VALUES (118, 25, 45, '凉拌猪耳', 58.00, 1, 58.00);
INSERT INTO `order_item` VALUES (119, 25, 44, '白米饭', 2.00, 3, 6.00);
INSERT INTO `order_item` VALUES (120, 25, 42, '绿豆沙', 12.00, 1, 12.00);
INSERT INTO `order_item` VALUES (121, 25, 39, '柠檬茶', 6.00, 1, 6.00);
INSERT INTO `order_item` VALUES (122, 25, 38, '菊花茶', 3.00, 1, 3.00);
INSERT INTO `order_item` VALUES (123, 26, 31, '荷塘小炒', 32.00, 1, 32.00);
INSERT INTO `order_item` VALUES (124, 26, 16, '菠萝咕噜肉', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (125, 26, 9, '金牌脆皮乳鸽', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (126, 27, 31, '荷塘小炒', 32.00, 1, 32.00);
INSERT INTO `order_item` VALUES (127, 27, 16, '菠萝咕噜肉', 48.00, 1, 48.00);
INSERT INTO `order_item` VALUES (128, 27, 33, '海鲜炒面', 38.00, 1, 38.00);
INSERT INTO `order_item` VALUES (129, 27, 9, '金牌脆皮乳鸽', 68.00, 1, 68.00);
INSERT INTO `order_item` VALUES (130, 27, 6, '扬州炒饭', 28.00, 1, 28.00);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `table_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `people_count` int(0) NULL DEFAULT 1,
  `total_price` decimal(10, 2) NOT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'pending',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 'ORD1780915179333', 'B01', 5, 330.00, 'finished', '', '2026-06-08 18:39:39');
INSERT INTO `orders` VALUES (2, 'ORD1780915193335', 'B01', 5, 48.00, 'finished', '', '2026-06-08 18:39:53');
INSERT INTO `orders` VALUES (18, 'ORD1780917485089', 'A01', 5, 352.00, 'finished', '', '2026-06-08 19:18:05');
INSERT INTO `orders` VALUES (19, 'ORD1780921034305', 'B01', 7, 858.00, 'finished', '', '2026-06-08 20:17:14');
INSERT INTO `orders` VALUES (20, 'ORD1780988333500', 'C03', 4, 282.00, 'finished', '', '2026-06-09 14:58:53');
INSERT INTO `orders` VALUES (21, 'ORD1780989577732', 'D01', 1, 68.00, 'finished', '', '2026-06-09 15:19:37');
INSERT INTO `orders` VALUES (22, 'ORD1780990631696', 'C02', 3, 135.00, 'finished', '', '2026-06-09 15:37:11');
INSERT INTO `orders` VALUES (23, 'ORD1780990992806', 'C01', 3, 315.00, 'finished', '', '2026-06-09 15:43:12');
INSERT INTO `orders` VALUES (24, 'ORD1781697570589', 'A03', 5, 262.00, 'finished', '', '2026-06-17 19:59:30');
INSERT INTO `orders` VALUES (25, 'ORD1781714324956', 'A02', 3, 311.00, 'finished', '', '2026-06-18 00:38:44');
INSERT INTO `orders` VALUES (26, 'ORD1781943842365', 'D01', 7, 148.00, 'finished', '', '2026-06-20 16:24:02');
INSERT INTO `orders` VALUES (27, 'ORD1782059329678', 'C03', 7, 214.00, 'finished', '', '2026-06-22 00:28:49');

-- ----------------------------
-- Table structure for table_info
-- ----------------------------
DROP TABLE IF EXISTS `table_info`;
CREATE TABLE `table_info`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `table_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(0) NULL DEFAULT 1,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of table_info
-- ----------------------------
INSERT INTO `table_info` VALUES (1, 'A01', 1, '2026-05-08 23:24:11');
INSERT INTO `table_info` VALUES (2, 'A02', 1, '2026-05-08 23:24:11');
INSERT INTO `table_info` VALUES (3, 'A03', 1, '2026-05-08 23:24:11');
INSERT INTO `table_info` VALUES (4, 'B01', 1, '2026-05-08 23:24:11');
INSERT INTO `table_info` VALUES (5, 'B02', 1, '2026-05-08 23:24:11');
INSERT INTO `table_info` VALUES (6, 'B03', 1, '2026-05-09 12:22:57');
INSERT INTO `table_info` VALUES (7, 'C01', 1, '2026-05-09 20:37:41');
INSERT INTO `table_info` VALUES (8, 'C02', 1, '2026-05-09 20:37:48');
INSERT INTO `table_info` VALUES (9, 'C03', 1, '2026-05-09 20:37:54');
INSERT INTO `table_info` VALUES (10, 'D01', 1, '2026-05-26 00:34:38');
INSERT INTO `table_info` VALUES (11, 'D02', 1, '2026-05-26 00:34:48');
INSERT INTO `table_info` VALUES (12, 'D03', 1, '2026-05-26 00:34:56');

SET FOREIGN_KEY_CHECKS = 1;

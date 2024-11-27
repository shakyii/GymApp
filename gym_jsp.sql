-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 27, 2024 at 06:59 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gym_jsp`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chat_history`
--

CREATE TABLE `chat_history` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_history`
--

INSERT INTO `chat_history` (`id`, `username`, `message`, `timestamp`) VALUES
(11, 'test', 'asdfasd', '2023-12-29 11:52:29'),
(12, 'test', 'fsdafasd', '2023-12-29 11:52:30'),
(13, 'test', 'asdasd', '2023-12-29 12:00:24'),
(14, 'test', 'd', '2023-12-29 12:00:25'),
(15, 'test', 'asdas', '2023-12-29 12:02:06'),
(16, 'test', 'asdasd', '2023-12-29 12:02:08'),
(17, 'test', 'a', '2023-12-29 12:03:00'),
(18, 'test', 'asd', '2023-12-29 12:03:32'),
(19, 'test', 'ds', '2023-12-29 12:03:34'),
(20, 'test', 'ds', '2023-12-29 12:03:37'),
(21, 'test', '', '2023-12-29 12:03:39'),
(22, 'test', '', '2023-12-29 12:03:39'),
(23, 'test', 'asdas', '2023-12-29 12:05:26'),
(24, 'test', 'tetetet', '2023-12-29 12:06:01'),
(25, 'shakyi', 'asdasd', '2023-12-29 12:07:11'),
(26, 'shakyi', 'asdasdas', '2023-12-29 12:15:55'),
(28, 'test', 'no elo', '2023-12-29 15:33:30'),
(29, 'test', 'asdasd', '2023-12-29 15:34:38'),
(30, 'test', 'gkjh', '2023-12-29 15:35:36'),
(31, 'test', 'asd', '2023-12-29 15:36:38'),
(32, 'test', 'testing enter key', '2023-12-29 15:36:44'),
(33, 'test', 'asd', '2023-12-29 15:57:10'),
(34, 'test', 'asd', '2023-12-31 12:04:11'),
(35, 'shakyi', 'asdf', '2023-12-31 12:04:28'),
(36, 'shakyi', 'fasdf', '2023-12-31 12:05:19'),
(37, 'shakyi', 'dsadsa', '2023-12-31 12:05:24'),
(38, 'shakyi', 'asdas', '2023-12-31 12:05:28'),
(39, 'shakyi', 'asd', '2023-12-31 12:05:29'),
(40, 'shakyi', 'a', '2023-12-31 12:05:29'),
(41, 'shakyi', 'sd', '2023-12-31 12:05:30'),
(42, 'shakyi', 'dsadas', '2023-12-31 12:05:33'),
(43, 'shakyi', 'asd', '2023-12-31 12:05:37'),
(44, 'shakyi', 'asd', '2023-12-31 12:05:41'),
(45, 'shakyi', 'asd', '2023-12-31 12:07:32'),
(46, 'shakyi', 'asd', '2023-12-31 12:07:34'),
(47, 'shakyi', 'asd', '2023-12-31 12:07:39'),
(48, 'shakyi', 'hdgafgdfs', '2023-12-31 12:07:42'),
(49, 'test', 'asdasdasdas', '2024-01-02 11:09:02'),
(50, 'test', 'asdg', '2024-01-02 11:09:05'),
(51, 'test', 'yo', '2024-01-02 11:09:09'),
(52, 'test', 'finished', '2024-01-02 11:12:29'),
(53, 'test', 'asdfasdfsd', '2024-01-02 11:12:36'),
(54, 'test', 'asdfasd', '2024-01-02 11:12:36'),
(55, 'test', 'fasdf', '2024-01-02 11:12:37'),
(56, 'test', 'asd', '2024-01-02 11:15:20'),
(57, 'test', 'asdasd', '2024-01-02 11:16:11'),
(58, 'test', 'aasd', '2024-01-02 11:16:13'),
(59, 'test', 'asd', '2024-01-02 11:16:13'),
(60, 'test', 'asd', '2024-01-02 11:16:14'),
(61, 'test', 'asd', '2024-01-03 20:45:33');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `username`, `content`, `creation_date`) VALUES
(12, 8, 'test', 'asdgasdg', '2023-11-25 10:49:34'),
(13, 8, 'shakyi', 'asdasd', '2023-11-25 10:49:51'),
(15, 8, 'test', 'asdas', '2023-11-25 10:50:14'),
(17, 8, 'test', 'asdaasd', '2023-12-16 11:55:17'),
(18, 8, 'test', 'asdasd', '2023-12-16 11:55:18'),
(19, 10, 'test', 'sdadsa', '2023-12-16 11:55:22'),
(20, 10, 'test', 'asd', '2024-01-02 15:35:31'),
(21, 10, 'test', 'asdfasd', '2024-01-02 15:35:34'),
(22, 11, 'test', 'asdasd', '2024-01-02 15:52:15');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `main_muscle_group` enum('chest','back','shoulders','triceps','biceps','legs') NOT NULL,
  `side_muscle_group` varchar(100) DEFAULT NULL,
  `difficulty` enum('1','2','3','4','5') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exercises`
--

INSERT INTO `exercises` (`id`, `name`, `main_muscle_group`, `side_muscle_group`, `difficulty`) VALUES
(1, 'Barbell Bench Press', 'chest', 'Triceps, Deltoid front, Serratus Anterior', '4'),
(2, 'Chest dip', 'chest', 'Deltoids front, Triceps, Teres Major, Latissimus Dorsi', '2'),
(3, 'Push up', 'chest', 'Deltoid front, Triceps, Teres Major, Latissimus Dorsi', '1'),
(4, 'Incline Dumbbell Bench Press', 'chest', 'Triceps, Deltoids Front, Serratus Anterior', '3'),
(5, 'Barbell Bent Over Row', 'back', 'Trapezius, Teres Major, Teres Minor, Deltoids Back, Chest', '2'),
(6, 'Pull Up', 'back', 'Brachialis, Brachioradialis, Biceps, Teres Minor, Teres Major', '2'),
(7, 'Seated Cable Row', 'back', 'Erector spinae, Trapezius, Teres Minor, Teres Major, Deltoid back, Brachialis, Brachioradialis', '2'),
(8, 'Dumbbell Lateral Raise', 'shoulders', 'Deltoids front, Trapezius, Serratus Anterior, Biceps', '2'),
(9, 'Military Press', 'shoulders', 'Deltoids Lateral, Triceps, Trapezius, Serratus Anterior, Infraspinatus', '3'),
(10, 'Face Pull', 'shoulders', NULL, '2'),
(11, 'Triceps Dip', 'triceps', 'Deltoids front, Trapezius, Latissimus Dorsi, Chest', '2'),
(12, 'Cable Triceps Pulldown', 'triceps', 'Brachialis', '2'),
(13, 'Barbell Close Grip Press', 'triceps', 'Brachialis, Chest, Deltoids front', '2'),
(14, 'Barbell Preacher Curl', 'biceps', 'Brachioradialis', '2'),
(15, 'Dumbbell Concetration Curl', 'biceps', 'Brachioradialis', '2'),
(16, 'Cable Overhead Curl', 'biceps', 'Brachialis, Biachioradialis', '2'),
(17, 'Barbell Squat', 'legs', 'Soleus, Hips Adductors, Glutes Maximus ', '5'),
(18, 'Deadlift', 'legs', 'Glutes Medius, Quadriceps, Soleus', '4'),
(19, 'Barbell Glute Bridge', 'legs', 'Glutes Medius, Glutes Maximus, Gastrocnemius', '3'),
(28, 'Dumbbell Flyes', 'chest', 'Triceps, Front Deltoids, Serratus Anterior', '2'),
(29, 'Chest Press Machine', 'chest', 'Front Deltoids, Triceps, Latissimus Dorsi, Serratus Anterior', '3'),
(30, 'Cable Crossover', 'chest', 'Front Deltoids, Triceps, Latissimus Dorsi, Serratus Anterior', '2'),
(31, 'Lat Pulldown', 'back', 'Biceps, Teres Major, Rhomboids', '2'),
(32, 'Single-Arm Dumbbell Row', 'back', 'Biceps, Teres Major, Rhomboids', '2'),
(33, 'Deadlift', 'back', 'Lower Back, Legs, Glutes', '4'),
(34, 'Front Plate Raise', 'shoulders', 'Front Deltoids, Triceps', '2'),
(35, 'Lateral Dumbbell Raise', 'shoulders', 'Side Deltoids, Trapezius', '2'),
(36, 'Shrugs', 'shoulders', 'Deltoids, Trapezius', '2'),
(37, 'Triceps Kickback', 'triceps', 'Brachialis, Front Deltoids', '2'),
(38, 'Overhead Triceps Extension', 'triceps', 'Deltoids, Triceps', '3'),
(39, 'Triceps Dips', 'triceps', 'Deltoids, Chest', '2'),
(40, 'Hammer Curls', 'biceps', 'Brachialis, Brachioradialis', '2'),
(41, 'Incline Dumbbell Curl', 'biceps', 'Brachialis, Brachioradialis', '3'),
(42, 'Cable Curl', 'biceps', 'Brachialis, Brachioradialis', '2'),
(43, 'Leg Press', 'legs', 'Glutes, Quadriceps, Hamstrings', '3'),
(44, 'Lunges', 'legs', 'Glutes, Quadriceps, Hamstrings', '2'),
(45, 'Calf Raises', 'legs', 'Calves', '2');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `username`, `title`, `content`, `creation_date`) VALUES
(8, 'test', 'gdfsagsd', 'gdsagsdasdasdasdasd', '2023-11-25 10:49:31'),
(10, 'shakyi', 'asd', 'asdasd', '2023-11-25 10:50:04'),
(11, 'test', 'test', 'test', '2024-01-02 15:50:30');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `training_plans`
--

CREATE TABLE `training_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training_plans`
--

INSERT INTO `training_plans` (`id`, `name`, `description`) VALUES
(1, 'FBW', 'Full-Body-Workout is a form of strength training that engages the entire body in one training sessio'),
(2, 'Push Pull FBW', 'The principle of push pull legs training is the division of the whole body into three training units'),
(3, 'Split', 'Split training is a method that assumes working on each muscle group during a different session, int'),
(4, 'Home Workout', 'General development training at home using your own body weight, no equipment required.'),
(5, '5x5 Workout', '5x5 training is focused on the development of strength and muscle mass, it consists in performing ex');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `training_plan_exercises`
--

CREATE TABLE `training_plan_exercises` (
  `plan_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `day` text NOT NULL,
  `exercise_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training_plan_exercises`
--

INSERT INTO `training_plan_exercises` (`plan_id`, `exercise_id`, `day`, `exercise_order`) VALUES
(1, 17, 'monday', 1),
(1, 5, 'monday', 2),
(1, 4, 'monday', 3),
(1, 8, 'monday', 4),
(1, 15, 'monday', 5),
(1, 13, 'monday', 6),
(1, 19, 'wednesday', 1),
(1, 6, 'wednesday', 2),
(1, 2, 'wednesday', 3),
(1, 9, 'wednesday', 4),
(1, 14, 'wednesday', 5),
(1, 12, 'wednesday', 6),
(1, 1, 'friday', 1),
(1, 18, 'friday', 2),
(1, 6, 'friday', 3),
(1, 9, 'friday', 4),
(1, 11, 'friday', 5),
(1, 16, 'friday', 6),
(2, 1, 'monday', 1),
(2, 4, 'monday', 2),
(2, 28, 'monday', 3),
(2, 17, 'monday', 4),
(2, 9, 'monday', 5),
(2, 8, 'monday', 6),
(2, 12, 'monday', 7),
(2, 18, 'wednesday', 1),
(2, 31, 'wednesday', 2),
(2, 7, 'wednesday', 3),
(2, 32, 'wednesday', 4),
(2, 36, 'wednesday', 5),
(2, 14, 'wednesday', 6),
(2, 16, 'wednesday', 7),
(2, 45, 'wednesday', 8),
(2, 1, 'friday', 1),
(2, 43, 'friday', 2),
(2, 19, 'friday', 3),
(2, 6, 'friday', 4),
(2, 11, 'friday', 5),
(2, 34, 'friday', 6),
(2, 13, 'friday', 7),
(2, 15, 'friday', 8),
(3, 4, 'monday', 1),
(3, 29, 'monday', 2),
(3, 28, 'monday', 3),
(3, 14, 'monday', 4),
(3, 15, 'monday', 5),
(3, 3, 'wednesday', 1),
(3, 18, 'wednesday', 2),
(3, 32, 'wednesday', 3),
(3, 31, 'wednesday', 4),
(3, 13, 'wednesday', 5),
(3, 12, 'monday', 6),
(3, 38, 'wednesday', 6),
(3, 17, 'friday', 1),
(3, 43, 'friday', 2),
(3, 44, 'friday', 3),
(3, 45, 'friday', 4),
(3, 8, 'friday', 5),
(3, 9, 'friday', 6),
(3, 34, 'friday', 7),
(4, 3, 'monday', 1),
(4, 6, 'monday', 2),
(4, 44, 'monday', 3),
(4, 45, 'monday', 4),
(4, 3, 'wednesday', 1),
(4, 6, 'wednesday', 2),
(4, 44, 'wednesday', 3),
(4, 45, 'wednesday', 4),
(4, 3, 'friday', 1),
(4, 6, 'friday', 2),
(4, 44, 'friday', 3),
(4, 45, 'friday', 4),
(5, 17, 'monday', 1),
(5, 1, 'monday', 2),
(5, 5, 'monday', 3),
(5, 17, 'wednesday', 1),
(5, 9, 'wednesday', 2),
(5, 18, 'wednesday', 3),
(5, 17, 'friday', 1),
(5, 1, 'friday', 2),
(5, 5, 'friday', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `birthdate` date DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `body_fat` decimal(10,2) DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `gender`, `birthdate`, `height`, `weight`, `body_fat`, `updated_at`) VALUES
(1, 'shakyi', 'shakyi', 'arkadiuszklak8@gmail.com', 'male', '2001-02-22', 1.73, 70.00, 13.00, '2023-05-15'),
(8, 'test', 'test', 'test@test.com', 'male', NULL, NULL, NULL, NULL, NULL),
(47, 'nowy', 'nowy', 'nowy@nowy.com', 'male', NULL, NULL, NULL, NULL, NULL),
(51, 'qwer', 'qwer', 'qwer@asd.com', 'male', NULL, NULL, NULL, NULL, NULL),
(52, 'asdlkjfh', 'asdlkjfh', 'asd@asldkjhf.com', 'female', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_exercises`
--

CREATE TABLE `user_exercises` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `main_muscle_group` enum('chest','back','shoulders','triceps','biceps','legs') NOT NULL,
  `side_muscle_group` varchar(255) NOT NULL,
  `difficulty` enum('1','2','3','4','5') NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_exercises`
--

INSERT INTO `user_exercises` (`id`, `name`, `main_muscle_group`, `side_muscle_group`, `difficulty`, `username`) VALUES
(1, 'test', 'chest', 'test', '1', 'test'),
(7, 'asd', 'triceps', 'asd', '1', 'test'),
(8, 'asd', 'biceps', 'gggg', '1', 'test'),
(13, 'fgasdf', 'chest', 'asdf', '1', 'shakyi'),
(14, 'hdfhdfs', 'triceps', 'gsad', '1', 'shakyi'),
(21, 'asd', 'back', 'asd', '2', 'test'),
(31, 'asdasdasd', 'chest', 'asdasdasdasd', '5', 'nowy'),
(33, 'dsad', 'triceps', 'asdasd', '2', 'shakyi'),
(36, 'test', 'chest', 'asdas', '4', 'nowy'),
(37, 'asd', 'chest', 'asd', '1', 'nowy'),
(41, 'qwer', 'legs', 'qwer', '5', 'qwer'),
(43, 'dasdasdasda', 'triceps', 'asdasdasdas', '2', 'test');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_plans`
--

CREATE TABLE `user_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_plans`
--

INSERT INTO `user_plans` (`id`, `name`, `description`, `username`) VALUES
(1, 'test2', 'test', 'shakyi'),
(3, 'My new plan', 'Testing your plans option, asdasdasdasdasdasdasdas', 'test'),
(4, 'nowy', '             asdasdas               ', 'test'),
(5, 'shakyi plan', '                         shakyis test plan   ', 'shakyi'),
(6, 'dasd', '          asdasd                  ', 'test'),
(7, 'asd', '          asd                  ', 'test'),
(19, 'nowy plan ', 'nowy plan uzytkownika test', 'test');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_plan_exercises`
--

CREATE TABLE `user_plan_exercises` (
  `id` int(11) NOT NULL,
  `user_plan_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `day` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
  `exercise_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_plan_exercises`
--

INSERT INTO `user_plan_exercises` (`id`, `user_plan_id`, `exercise_id`, `day`, `exercise_order`) VALUES
(21, 3, 1, 'monday', 1),
(24, 3, 1, 'tuesday', 1),
(27, 3, 5, 'monday', 2),
(30, 3, 45, 'tuesday', 3),
(31, 3, 18, 'monday', 3),
(46, 3, 1, 'sunday', 2),
(50, 4, 1, 'monday', 1),
(51, 19, 1, 'monday', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_plan_user_exercises`
--

CREATE TABLE `user_plan_user_exercises` (
  `id` int(11) NOT NULL,
  `user_plan_id` int(11) NOT NULL,
  `user_exercise_id` int(11) NOT NULL,
  `day` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
  `exercise_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_plan_user_exercises`
--

INSERT INTO `user_plan_user_exercises` (`id`, `user_plan_id`, `user_exercise_id`, `day`, `exercise_order`) VALUES
(48, 3, 1, 'tuesday', 2),
(24, 3, 1, 'wednesday', 1),
(19, 3, 1, 'thursday', 1),
(22, 3, 1, 'friday', 1),
(25, 3, 1, 'saturday', 1),
(49, 3, 7, 'sunday', 1),
(50, 19, 7, 'monday', 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `workouts`
--

CREATE TABLE `workouts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `date` date NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `workout_exercises`
--

CREATE TABLE `workout_exercises` (
  `workout_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `set_number` int(11) NOT NULL,
  `reps` int(11) NOT NULL,
  `weight` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `chat_history`
--
ALTER TABLE `chat_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`,`username`),
  ADD KEY `username` (`username`);

--
-- Indeksy dla tabeli `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `post_id` (`post_id`,`username`),
  ADD KEY `username` (`username`);

--
-- Indeksy dla tabeli `training_plans`
--
ALTER TABLE `training_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `training_plan_exercises`
--
ALTER TABLE `training_plan_exercises`
  ADD UNIQUE KEY `unique_exercise_order_per_day_plan` (`plan_id`,`day`,`exercise_order`) USING HASH,
  ADD KEY `plan_id` (`plan_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`password`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeksy dla tabeli `user_exercises`
--
ALTER TABLE `user_exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- Indeksy dla tabeli `user_plans`
--
ALTER TABLE `user_plans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_unique_name_per_user` (`name`,`username`),
  ADD KEY `username` (`username`);

--
-- Indeksy dla tabeli `user_plan_exercises`
--
ALTER TABLE `user_plan_exercises`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_exercise_order_per_day_plan` (`user_plan_id`,`day`,`exercise_order`),
  ADD UNIQUE KEY `uc_user_plan_user_exercises_plan_day_order` (`user_plan_id`,`day`,`exercise_order`),
  ADD KEY `user_plan_id` (`user_plan_id`,`exercise_id`) USING BTREE;

--
-- Indeksy dla tabeli `user_plan_user_exercises`
--
ALTER TABLE `user_plan_user_exercises`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uc_user_plan_user_exercises` (`user_plan_id`,`user_exercise_id`,`day`,`exercise_order`),
  ADD UNIQUE KEY `uc_user_plan_user_exercises_plan_day_order` (`user_plan_id`,`day`,`exercise_order`),
  ADD KEY `user_plan_id` (`user_plan_id`),
  ADD KEY `user_exercise_id` (`user_exercise_id`);

--
-- Indeksy dla tabeli `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `workout_exercises`
--
ALTER TABLE `workout_exercises`
  ADD KEY `workout_id` (`workout_id`),
  ADD KEY `exercise_id` (`exercise_id`),
  ADD KEY `workout_id_2` (`workout_id`,`exercise_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_history`
--
ALTER TABLE `chat_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `training_plans`
--
ALTER TABLE `training_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `user_exercises`
--
ALTER TABLE `user_exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `user_plans`
--
ALTER TABLE `user_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_plan_exercises`
--
ALTER TABLE `user_plan_exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `user_plan_user_exercises`
--
ALTER TABLE `user_plan_user_exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_history`
--
ALTER TABLE `chat_history`
  ADD CONSTRAINT `chat_history_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `training_plan_exercises`
--
ALTER TABLE `training_plan_exercises`
  ADD CONSTRAINT `training_plan_exercises_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `training_plans` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `training_plan_exercises_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_exercises`
--
ALTER TABLE `user_exercises`
  ADD CONSTRAINT `user_exercises_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `user_plans`
--
ALTER TABLE `user_plans`
  ADD CONSTRAINT `user_plans_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE;

--
-- Constraints for table `user_plan_exercises`
--
ALTER TABLE `user_plan_exercises`
  ADD CONSTRAINT `user_plan_exercises_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_plan_exercises_ibfk_2` FOREIGN KEY (`user_plan_id`) REFERENCES `user_plans` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_plan_user_exercises`
--
ALTER TABLE `user_plan_user_exercises`
  ADD CONSTRAINT `user_plan_user_exercises_ibfk_1` FOREIGN KEY (`user_plan_id`) REFERENCES `user_plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_plan_user_exercises_ibfk_2` FOREIGN KEY (`user_exercise_id`) REFERENCES `user_exercises` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `workouts`
--
ALTER TABLE `workouts`
  ADD CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workout_exercises`
--
ALTER TABLE `workout_exercises`
  ADD CONSTRAINT `workout_exercises_ibfk_1` FOREIGN KEY (`workout_id`) REFERENCES `workouts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `workout_exercises_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

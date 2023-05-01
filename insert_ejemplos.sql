USE tutorial_node;
DELETE FROM `theme`;
INSERT INTO `theme` (`idTheme`, `themeName`) VALUES
('1', 'Charlas'),
('2', 'Ocio'),
('3', 'Cursos'),
('4', 'Talleres'),
('5', 'Excursiones'),
('6', 'Actividades al aire libre');

DELETE FROM `publictype`;
INSERT INTO `publictype` (`idPublicType`, `publicType`) VALUES
('1', 'Miembros'),
('2', 'Familiares'),
('3', 'Voluntarios'),
('4', 'Profesionales'),
('5', 'Puertas Abiertas');

DELETE FROM `period`;
INSERT INTO `period` (`idPeriod`, `period`) VALUES
('1', 'Diario'),
('2', 'Semanal'),
('3', 'Dos veces por semana'),
('4', 'Mensual'),
('5', 'Dos veces por mes'),
('6', 'Anual');

DELETE FROM `orgtype`;
INSERT INTO `orgtype` (`idTypeOrg`, `orgType`) VALUES
('1', 'Informático'),
('2', 'Entrenador'),
('3', 'Profesor'),
('4', 'Artista');

DELETE FROM `imgact`;
INSERT INTO `imgact` (`idImgAct`, `name`, `ImgAct`) VALUES
('1','Imagen de charlas', null),
('2','Imagen de ocio', null),
('3','Imagen de cursos', null),
('4','Imagen de talleres', null),
('5','Imagen de excursiones', null),
('6','Imagen de actividades al aire libre', null);

DELETE FROM `imgorg`;
INSERT INTO `imgorg` (`idImgOrg`, `name`, `ImgOrg`) VALUES
('1','Foto Pucho', null),
('2','Foto Olivan', null),
('3','Foto Alex', null),
('4','Foto Lacal', null);

DELETE FROM `newusers`;
INSERT INTO `newusers` (`userNIF`, `name`, `lastname`, `email`, `birthdate`, `phoneNumber`, `password`, `gender`) VALUES
('78331338P', 'Pucho', 'Picado', 'puchopicadodavila@gmail.com', '2023-03-01', '+34 644169888', '$2a$10$46iYdSSzbpv6i8jClxb/vOiKUCcHc7IzYyaVDBZ6WjV8jjeNKO/ru', 'Hombre'),
('34267890F', 'Javier', 'Olivan', 'javierolivan@gmail.com', '2001-03-15', '+34 612345678', '$2a$10$46iYdSSzbpv6i8jClxb/vOiKUCcHc7IzYyaVDBZ6WjV8jjeNKO/ru', 'Hombre'),
('73286542N', 'Alex', 'Monreal', 'alexmonreal@gmail.com', '1987-09-08', '+34 677889900', '$2a$10$46iYdSSzbpv6i8jClxb/vOiKUCcHc7IzYyaVDBZ6WjV8jjeNKO/ru', 'Hombre'),
('09876543Z', 'Rodrigo', 'Lacal', 'rodrigolacal@gmail.com', '1998-11-23', '+34 633445566', '$2a$10$46iYdSSzbpv6i8jClxb/vOiKUCcHc7IzYyaVDBZ6WjV8jjeNKO/ru', 'Hombre'),
('55678901R', 'Mario', 'Mario', 'mariobros@gmail.com', '1985-09-13', '+34 666777888', '$2a$10$46iYdSSzbpv6i8jClxb/vOiKUCcHc7IzYyaVDBZ6WjV8jjeNKO/ru', 'Hombre'),
('23456789T', 'Zelda', 'Hyrule', 'zeldahyrule@gmail.com', '1986-02-21', '+34 677889900', '$2a$10$46iYdSSzbpv6i8jClxb/vOiKUCcHc7IzYyaVDBZ6WjV8jjeNKO/ru', 'Mujer'),
('12345678U', 'Kratos', 'Spartan', 'kratoss@gmail.com', '2005-03-22', '+34 644169888', '$2a$10$46iYdSSzbpv6i8jClxb/vOiKUCcHc7IzYyaVDBZ6WjV8jjeNKO/ru', 'Hombre'),
('80247484K', 'Banjo', 'Kazooie', 'banjokazooie@gmail.com', '1995-05-22', '+34 600111222', '$2a$10$46iYdSSzbpv6i8jClxb/vOiKUCcHc7IzYyaVDBZ6WjV8jjeNKO/ru', 'Oso');

DELETE FROM `organizer`;
INSERT INTO `organizer` (`NifOrg`, `idImgOrg`, `idTypeOrg`) VALUES
('78331338P', '1', '1'),
('34267890F', '2', '2'),
('73286542N', '3', '4'),
('09876543Z', '4', '3');

DELETE FROM `competitor`;
INSERT INTO `competitor` (`NifCom`, `emergencyNumber`) VALUES
('55678901R', '+34 666777888'),
('23456789T', '+34 677889900'),
('12345678U', '+34 644169888'),
('80247484K', '+34 600111222');

DELETE FROM `newactivities`;
INSERT INTO `newactivities`(`activityId`, `nameAct`, `idPublicType`, `idTheme`, `idImgAct`,  `startDate`, `finishDate`, `idPeriod`, `idCreator`, `Description`, `Limit`) VALUES
('1', 'Actividad de Prueba 1', '1', '1', '1', CURDATE(), NULL, NULL, '78331338P', 'Es una charla de prueba', '12'),
('4', 'Actividad de Prueba 2', '1', '1', '1', '2023-05-03 07:00:00', NULL, NULL, '78331338P', 'Es una charla de prueba', '12'),
('2', 'Actividad Recurrente de Prueba 1', '2', '1', '1', '2023-1-31', '2023-12-31', '2', '34267890F', 'Es una charla recurrente de prueba', '10'),
('3', 'Actividad Recurrente de Prueba 2', '2', '1', '1', 2023-1-31, '2023-12-31', '2', '34267890F', 'Es una charla recurrente de prueba', '10');


DELETE FROM `periodicact`;
INSERT INTO `periodicact` (`activityId`,`actDate`,`NifOrg`,`actPlace`, `Duration`) VALUES -- Hay que aprender a asignar valores de tiempo, aunque se puede tomar por los últimos datos de la fecha
('1', CURDATE() , '73286542N', 'Calle de las Armas, 71', 'Mucho'),
('1', '2023-04-30 07:00:00' , '73286542N', 'Calle de las Armas, 71', 'Media hora'),
('2', '2023-04-29 07:00:00' , '09876543Z', 'Calle de las Armas, 71', 'Media hora'),
('2', '2023-04-30 07:00:00' , '09876543Z', 'Calle de las Armas, 71', 'Media hora'),
('2', '2023-05-01 07:00:00' , '09876543Z', 'Calle de las Armas, 71', 'Media hora'),
('2', '2023-05-02 07:00:00' , '09876543Z', 'Calle de las Armas, 71', 'Media hora'),
('2', '2023-05-03 07:00:00' , '09876543Z', 'Calle de las Armas, 71', 'Media hora'),
('2', '2023-05-04 07:00:00' , '09876543Z', 'Calle de las Armas, 71', 'Media hora'),
('2', '2023-05-05 07:00:00' , '09876543Z', 'Calle de las Armas, 71', 'Media hora'),
('2', '2023-05-06 07:00:00' , '09876543Z', 'Calle de las Armas, 71', 'Media hora'),
('4', '2023-05-03 07:00:00' , '73286542N', 'Calle de las Armas, 71', 'Media hora');

DELETE FROM `compacts`;
INSERT INTO `compacts` (`activityId`,`NifCom`,`ActDate`) VALUES
('1', '55678901R', CURDATE()),
('1', '23456789T', CURDATE()),
('1', '12345678U', CURDATE()),

('2', '12345678U', '2023-04-30 07:00:00'),
('2', '12345678U', '2023-05-05 07:00:00');

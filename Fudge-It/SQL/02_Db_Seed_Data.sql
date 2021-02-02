INSERT INTO [UserProfile]
([FirebaseUserId], [Email], [FirstName], [LastName], [CreatedDate], [Cashflow])
VALUES
('cJVrpOMpM1OsDDleqOwBqeL7Uln2','ggolden@mail.com','Greg', 'Golden', '01-01-2021', 10000.00),
('F2o84k6NZTbLDtWhuj2A1dM7wIO2', 'ssilvers@mail.com', 'Sam', 'Silvers', '01-10-2021', 5000.00),
('6i2Lo3dW8SS9HSF4trMO7Z9g2AW2', 'bbronze@mail.com', 'Becca', 'Bronze', '01-20-2021', 2500.00);

INSERT INTO [Expense]
([Name], [ExpenseDate], [Need], [Recurring], [Cost], [UserProfileId])
VALUES
('Yacht Fees', '02-01-2021', 0, 1, 500.12, 1),
('Sparkling Toilet Water', '02-17-2021', 0, 0, 150.69, 1),
('WinZip', '02-01-2021', 1, 0,  59.99, 1),
('Tesla Payment', '02-01-2021', 1, 1, 250.00, 2),
('Mortgage', '02-01-2021', 1, 1, 1000.23, 2),
('Xbox Series X', '02-26-2021', 0, 0, 524.37, 2),
('Rent', '02-01-2021', 1, 1, 1100.78, 3),
('Car Payment', '02-01-2021', 1, 1, 123.45, 3),
('Groceries', '02-01-2021', 1, 0, 35.36, 3);

INSERT INTO [Tag]
([Name], [UserProfileId], [CreatedDate])
VALUES
('Car', 3, '01-02-2021'),
('Tesla', 2, '01-02-2021'),
('Gaming', 2, '01-02-2021'),
('Food', 3, '01-02-2021'),
('Boat', 1, '01-02-2021');

INSERT INTO [ExpenseTag]
([TagId], [ExpenseId])
VALUES
(1, 8),
(2, 4),
(3, 6),
(4, 9),
(5, 1);
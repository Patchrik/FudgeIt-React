USE [master]
GO
IF db_id('FudgeIt') IS NULL
  CREATE DATABASE [FudgeIt]
GO
USE [FudgeIt]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Expense];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [ExpenseTag];

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(50),
  [Email] nvarchar(50),
  [FirstName] nvarchar(100),
  [LastName] nvarchar(100),
  [CreatedDate] datetime,
  [Cashflow] decimal
)
GO

CREATE TABLE [Expense] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(100),
  [ExpenseDate] datetime,
  [Recurring] bit,
  [Need] bit,
  [Cost] decimal,
  [UserProfileId] int
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(100),
  [UserProfileId] int,
  [CreatedDate] datetime
)
GO

CREATE TABLE [ExpenseTag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [TagId] int,
  [ExpenseId] int
)
GO

ALTER TABLE [Expense] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Tag] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [ExpenseTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([id])
GO

ALTER TABLE [ExpenseTag] ADD FOREIGN KEY ([ExpenseId]) REFERENCES [Expense] ([id])
GO
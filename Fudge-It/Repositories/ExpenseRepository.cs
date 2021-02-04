using Fudge_It.Data;
using Fudge_It.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Repositories
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ApplicationDbContext _context;

        public ExpenseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Expense> GetExpensesByUserProfileId(int userProfileId)
        {
            return _context.Expense.Include(exp => exp.ExpenseTags).ThenInclude(expTag => expTag.Tag).Where(exp => exp.UserProfileId == userProfileId).OrderByDescending(exp => exp.ExpenseDate).ToList();

        }

        public Expense GetById(int id)
        {
            return _context.Expense.Include(exp => exp.ExpenseTags).ThenInclude(expTag => expTag.Tag).Where(exp => exp.Id == id).FirstOrDefault();
        }

        public void Add(Expense expense)
        {
            _context.Add(expense);
            _context.SaveChanges();
        }

        public void Update(Expense expense)
        {
            _context.Entry(expense).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var expense = GetById(id);

            var tags = expense.ExpenseTags;
            foreach (var ExpTag in tags)
            {
                _context.ExpenseTag.Remove(ExpTag);
            }

            _context.Expense.Remove(expense);
            _context.SaveChanges();
        }
    }
}

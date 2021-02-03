using Fudge_It.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Repositories
{
    public interface IExpenseRepository
    {
        List<Expense> GetExpensesByUserProfileId(int userProfileId);
        public Expense GetById(int id);
        void Add(Expense expense);
        public void Update(Expense expense);
        public void Delete(int id);
    }
}

using Fudge_It.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Repositories
{
    public interface IExpenseRepository
    {
        public List<Expense> GetExpensesByCurrentMonthAndUserProfileId(int userProfileId);
        public List<Expense> GetExpensesByUserProfileIdTake10(int userProfileId);
        
        public List<Expense> GetUsersNeeds(int userProfileId);
        public List<Expense> GetUsersWants(int userProfileId);
        public Expense GetById(int id);
        void Add(Expense expense);
        public void Update(Expense expense);
        public void Delete(int id);
    }
}

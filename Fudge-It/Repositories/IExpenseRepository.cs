using Fudge_It.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Repositories
{
    public interface IExpenseRepository
    {
        void Add(Expense expense);
        List<Expense> GetExpensesByUserProfileId(int userProfileId);
    }
}

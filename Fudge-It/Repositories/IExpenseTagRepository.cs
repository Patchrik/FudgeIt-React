using Fudge_It.Models;
using System.Collections.Generic;

namespace Fudge_It.Repositories
{
    public interface IExpenseTagRepository
    {
        List<ExpenseTag> GetExpenseTagsByExpenseId(int expenseId);

        void Add(ExpenseTag exTag);

    }
}
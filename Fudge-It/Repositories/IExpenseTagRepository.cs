using Fudge_It.Models;
using System.Collections.Generic;

namespace Fudge_It.Repositories
{
    public interface IExpenseTagRepository
    {
        public List<ExpenseTag> GetAllExpenseTags();
        List<ExpenseTag> GetExpenseTagsByTagId(int tagId);
        void Add(ExpenseTag exTag);
        public ExpenseTag GetById(int id);
        public ExpenseTag GetByExpenseIdAndTagId(int Exid, int TagId);
        public void Delete(int id);

    }
}
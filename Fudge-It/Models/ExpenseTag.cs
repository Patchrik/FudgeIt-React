using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Models
{
    public class ExpenseTag
    {
        public int Id { get; set; }
        public int TagId { get; set; }
        public int ExpenseId { get; set; }
        public Tag Tag { get; set; }
        public Expense Expense { get; set; }
    }
}

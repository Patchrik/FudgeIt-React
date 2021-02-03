using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ExpenseDate { get; set; }
        public bool Recurring { get; set; }
        public bool Need { get; set; }
        public decimal Cost { get; set; }
        public int UserProfileId { get; set; }
        public List<ExpenseTag> ExpenseTags { get; set; }
    }
}

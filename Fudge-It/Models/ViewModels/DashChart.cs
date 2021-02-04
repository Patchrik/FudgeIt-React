using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Models.ViewModels
{
    public class DashChart
    {
        public List<decimal> Sums { get; set; }
        public List<string> Labels { get; set; }
        public decimal MoneySpent { get; set; }
        public decimal CashRemaining { get; set; }
    }
}

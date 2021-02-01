using Fudge_It.Models;
using Fudge_It.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseRepository _repo;
        public ExpenseController(IExpenseRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{userId}")]
        public IActionResult GetUsersExpenses(int userId)
        {
            //this will return a list of the expenses that a user has.
            return Ok(_repo.GetExpensesByUserProfileId(userId));
        }

        [HttpPost]
        public IActionResult Post(Expense expense)
        {
            //We might want to check to make sure this is a real value in the future
            //if (expense.ExpenseDate == null)
            //{
            //    expense.ExpenseDate = DateTime.Now;
            //}

            _repo.Add(expense);
            return CreatedAtAction("Get", new {id = expense.Id }, expense);
        }
    }
}

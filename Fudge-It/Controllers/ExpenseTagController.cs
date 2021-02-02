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
    public class ExpenseTagController : ControllerBase
    {
        private readonly IExpenseTagRepository _repo;
        public ExpenseTagController(IExpenseTagRepository repo)
        {
            _repo = repo;
        }

        //[HttpGet("{tagId}")]
        //public IActionResult GetUsersExpensesAndTag(int tagId)
        //{
        //    //this will return a list of the expenses that a user has.
        //    return Ok(_repo.GetExpenseTagsByTagId(tagId));
        //}

        [HttpPost]
        public IActionResult Post(ExpenseTag expenseTag)
        {
            //We might want to check to make sure this is a real value in the future
            //if (expense.ExpenseDate == null)
            //{
            //    expense.ExpenseDate = DateTime.Now;
            //}

            _repo.Add(expenseTag);
            return CreatedAtAction("Get", new {id = expenseTag.Id }, expenseTag);
        }
    }
}

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

        [HttpGet("{tagId}")]
        public IActionResult GetUsersExpensesAndTag(int tagId)
        {
            //this will return a list of the expenses that a user has.
            return Ok(_repo.GetExpenseTagsByTagId(tagId));
        }

        [HttpPost]
        public IActionResult Post(ExpenseTag expenseTag)
        {
            var dupe = _repo.GetByExpenseIdAndTagId(expenseTag.ExpenseId, expenseTag.TagId);

            if (dupe != null)
            {
                return BadRequest();
            }

            _repo.Add(expenseTag);
            return Ok(expenseTag);
        }
    }
}

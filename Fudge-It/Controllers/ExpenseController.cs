using Fudge_It.Models;
using Fudge_It.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Fudge_It.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseRepository _repo;
        private readonly IUserProfileRepository _userRepo;
        public ExpenseController(IExpenseRepository repo, IUserProfileRepository userProfileRepo)
        {
            _repo = repo;
            _userRepo = userProfileRepo;
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
            expense.UserProfileId = GetCurrentUserProfile().Id;

            _repo.Add(expense);
            return CreatedAtAction("Get", new {id = expense.Id }, expense);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserIdBare(firebaseUserId);
        }

    }
}

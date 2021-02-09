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
        private readonly IExpenseTagRepository _expenseTagRepo;
        public ExpenseController(IExpenseRepository repo, IUserProfileRepository userProfileRepo, IExpenseTagRepository expenseTagRepo)
        {
            _repo = repo;
            _userRepo = userProfileRepo;
            _expenseTagRepo = expenseTagRepo;
            
        }

        [HttpGet("{userId}")]
        public IActionResult GetUsersExpenses(int userId)
        {
            //this will return a list of the expenses that a user has.
            return Ok(_repo.GetExpensesByUserProfileId(userId));
        }
        
        [HttpGet("bytagid/{tagId}")]
        public IActionResult GetUsersExpensesByTagId(int tagId)
        {
            var expenseTagPosts = _expenseTagRepo.GetExpenseTagsByTagId(tagId);

            if (expenseTagPosts == null)
            {
                return BadRequest();
            }

            return Ok(expenseTagPosts);
        }



        [HttpPost]
        public IActionResult Post(Expense expense)
        {
            expense.UserProfileId = GetCurrentUserProfile().Id;

            _repo.Add(expense);
            return Ok(expense);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Expense expense)
        {
            if (id != expense.Id)
            {
                return BadRequest();
            }

            var user = GetCurrentUserProfile();

            if (user.Id != expense.UserProfileId)
            {
                return Unauthorized();
            }

            _repo.Update(expense);
            return Ok(expense);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) 
        {
            var user = GetCurrentUserProfile();
            var expenseToDelete = _repo.GetById(id);

            if (expenseToDelete == null)
            {
                return BadRequest();
            }

            if (user.Id != expenseToDelete.UserProfileId )
            {
                return Unauthorized();
            }

            _repo.Delete(id);

            return NoContent();

        }


        // This is a simple util to get the current user's profile to check if they're authorized to make the change.
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserIdBare(firebaseUserId);
        }

    }
}

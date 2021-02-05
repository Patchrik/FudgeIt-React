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
    public class ExpenseTagController : ControllerBase
    {
        private readonly IExpenseTagRepository _repo;
        private readonly IUserProfileRepository _userRepo;
        private readonly IExpenseRepository _expenseRepo;
        public ExpenseTagController(IExpenseTagRepository repo, IUserProfileRepository userRepo, IExpenseRepository expenseRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
            _expenseRepo = expenseRepo;
        }

        [HttpGet("{expId}")]
        public IActionResult GetExpenseTagsbyExpenseId(int expId)
        {
            //this will return a list of the expenses that a user has.
            return Ok(_repo.GetExpenseTagsByExpId(expId));
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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();

            var expTagToDelete = _repo.GetById(id);

            if (expTagToDelete.Tag.UserProfileId != user.Id)
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

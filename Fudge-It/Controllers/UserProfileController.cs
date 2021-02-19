using Fudge_It.Models;
using Fudge_It.Repositories;
using Microsoft.AspNetCore.Authorization;
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
    //[Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _repo;
        public UserProfileController(IUserProfileRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_repo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreatedDate = DateTime.Now;
            
            _repo.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPut]
        public IActionResult Put(UserProfile userProfile)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id != userProfile.Id)
            {
                return Unauthorized();
            }

            currentUser.FirstName = userProfile.FirstName;
            currentUser.LastName = userProfile.LastName;
            currentUser.Cashflow = userProfile.Cashflow;

            
            _repo.Update(currentUser);
            return NoContent();
        }

        // This is a simple util to get the current user's profile to check if they're authorized to make the change.
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserIdBare(firebaseUserId);
        }
    }
}

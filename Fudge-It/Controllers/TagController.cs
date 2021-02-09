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
    [Authorize]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepo;
        private readonly IUserProfileRepository _userRepo;

        public TagController(ITagRepository tagRepo, IUserProfileRepository userRepo)
        {
            _tagRepo = tagRepo;
            _userRepo = userRepo;
        }

        [HttpGet("{userId}")]
        public IActionResult GetUsersTags(int userId) 
        {
            return Ok(_tagRepo.GetTagsByUserProfileId(userId));
        }

        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            tag.UserProfileId = GetCurrentUserProfile().Id;

            tag.CreatedDate = DateTime.Now;

            _tagRepo.Add(tag);

            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }

            var user = GetCurrentUserProfile();
            if (user.Id != tag.UserProfileId)
            {
                return Unauthorized();
            }

            _tagRepo.Update(tag);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            var tagToDelete = _tagRepo.GetById(id);

            if (user.Id != tagToDelete.UserProfileId)
            {
                Unauthorized();
            }

            _tagRepo.Delete(id);

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

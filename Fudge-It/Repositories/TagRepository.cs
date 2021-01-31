using Fudge_It.Data;
using Fudge_It.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly ApplicationDbContext _context;

        public TagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Tag> GetTagsByUserProfileId(int userProfileId)
        {
            return _context.Tag.Where(tag => tag.UserProfileId == userProfileId).ToList();

        }

        public void Add(Tag tag)
        {
            _context.Add(tag);
            _context.SaveChanges();
        }
    }
}

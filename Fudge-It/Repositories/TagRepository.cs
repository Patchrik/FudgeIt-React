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
            return _context.Tag.Include(tag => tag.ExpenseTags).ThenInclude(expTag => expTag.Tag).Where(tag => tag.UserProfileId == userProfileId).ToList();

        }

        public Tag GetById(int id) 
        {
            return _context.Tag.Include(tag => tag.ExpenseTags).Where(tag => tag.Id == id).FirstOrDefault();
        }

        public void Add(Tag tag)
        {

            _context.Add(tag);
            _context.SaveChanges();
        }

        public void Update(Tag tag) 
        {
            _context.Entry(tag).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var tag = GetById(id);

            var expenseTags = tag.ExpenseTags;
            foreach (var expTag in expenseTags)
            {
                _context.ExpenseTag.Remove(expTag);
            }

            _context.Tag.Remove(tag);
            _context.SaveChanges();
            
        }
    }
}

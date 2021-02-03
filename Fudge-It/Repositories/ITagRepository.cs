using Fudge_It.Models;
using System.Collections.Generic;

namespace Fudge_It.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetTagsByUserProfileId(int userProfileId);

        public Tag GetById(int id);

        void Add(Tag tag);

        public void Update(Tag tag);

        public void Delete(int id);
    }
}
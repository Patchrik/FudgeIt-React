using Fudge_It.Models;
using System.Collections.Generic;

namespace Fudge_It.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetTagsByUserProfileId(int userProfileId);

        void Add(Tag tag);
    }
}
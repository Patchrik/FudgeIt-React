using Fudge_It.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Update(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetByFirebaseUserIdBare(string firebaseUserId);
    }
}

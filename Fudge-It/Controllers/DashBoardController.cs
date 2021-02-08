﻿using Fudge_It.Models;
using Fudge_It.Models.ViewModels;
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
    public class DashboardController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepo;
        private readonly ITagRepository _tagRepo;
        private readonly IExpenseTagRepository _expenseTagRepo;
        private readonly IUserProfileRepository _userRepo;

        public DashboardController(IExpenseRepository expenseRepo, ITagRepository tagRepo, IExpenseTagRepository expenseTagRepo, IUserProfileRepository userRepo)
        {
            _expenseRepo = expenseRepo;
            _tagRepo = tagRepo;
            _expenseTagRepo = expenseTagRepo;
            _userRepo = userRepo;
        }

        [HttpGet("dashchart")]
        public IActionResult GetUsersChartData()
        {
            var currentUser = GetCurrentUserProfile();

            var currentUsersTags = _tagRepo.GetTagsByUserProfileId(currentUser.Id);

            var currentUsersExpenses = _expenseRepo.GetExpensesByUserProfileId(currentUser.Id);

            var moneySpent = currentUsersExpenses.Sum(exp => exp.Cost);

            var remainingCash = currentUser.Cashflow - moneySpent;

            List<string> usersTagNameList = new List<string>();
            List<int> usersTagIdList = new List<int>();
            List<decimal> usersTagCostList = new List<decimal>();

            foreach (var tag in currentUsersTags)
            {
                if (usersTagNameList.Contains(tag.Name) == false)
                {
                    usersTagNameList.Add(tag.Name);
                    usersTagIdList.Add(tag.Id);
                }
            }

            foreach (var tagId in usersTagIdList)
            {
                decimal currentCostCount = 0;
                var currentUsersExTags = _expenseTagRepo.GetExpenseTagsByTagId(tagId);
                foreach (var expTag in currentUsersExTags)
                {
                    currentCostCount += expTag.Expense.Cost;
                };
                usersTagCostList.Add(currentCostCount);
            }

            var dashChart = new DashChart()
            {
                Labels = usersTagNameList,
                Sums = usersTagCostList,
                MoneySpent = moneySpent,
                CashRemaining = remainingCash,
            };
            return Ok(dashChart);
        }

        [HttpGet("expensechart")]
        public IActionResult GetUsersNeedsWantsChart()
        {
            var user = GetCurrentUserProfile();

            var usersNeedsCost = _expenseRepo.GetUsersNeeds(user.Id).Sum(exp => exp.Cost);

            var userWantsCost = _expenseRepo.GetUsersWants(user.Id).Sum(exp => exp.Cost);

            var needsWantsChart = new NeedWantChart()
            {
                SpentOnNeeds = usersNeedsCost,
                SpentOnWants = userWantsCost
            };
            return Ok(needsWantsChart);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserIdBare(firebaseUserId);
        }

    }
}

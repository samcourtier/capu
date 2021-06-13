using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class UsersController : ControllerBase
	{
		private readonly ILogger<UsersController> _logger;

		private static readonly User Alice = new User(
			id: new Guid("191315df-2a80-46f6-977c-058b5a8719c5"),
			displayName: "Alice A"
		);

		private static readonly User Bob = new User(
			id: new Guid("1a31ec6c-5c02-4c16-8c2f-59c220e0a31e"),
			displayName: "Bob B"
		);

		private static readonly User Carol = new User(
			id: new Guid("158c5b1f-34e5-40ad-a5da-3f5da775e52a"),
			displayName: "Carol C"
		);

		private static readonly Dictionary<Guid, User> users = new Dictionary<Guid, User>
		{
			[Alice.Id] = Alice,
			[Bob.Id] = Bob,
			[Carol.Id] = Carol
		};

		public UsersController(ILogger<UsersController> logger)
		{
			_logger = logger;
		}

		[HttpGet]
		public IEnumerable<User> GetUsers()
		{
			return users.Values;
		}
	};
}
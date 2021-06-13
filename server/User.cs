using System;

public class User
{
	internal User(Guid id, string displayName)
	{
		Id = id;
		DisplayName = displayName;
	}

	public Guid Id { get; }

	public string DisplayName { get; }
}

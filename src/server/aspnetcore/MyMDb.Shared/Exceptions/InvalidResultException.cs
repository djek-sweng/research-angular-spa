namespace MyMDb.Shared.Exceptions;

public class InvalidResultException : Exception
{
    public InvalidResultException(string? message)
        : base(message)
    {
    }
}

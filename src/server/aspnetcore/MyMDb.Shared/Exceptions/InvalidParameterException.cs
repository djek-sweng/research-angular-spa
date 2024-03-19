namespace MyMDb.Shared.Exceptions;

public class InvalidParameterException : Exception
{
    public InvalidParameterException(string? message)
        : base(message)
    {
    }
}

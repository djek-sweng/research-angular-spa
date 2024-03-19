namespace MyMDb.Shared.Misc;

public static class Guard
{
    public static void MaxLength(string? str, int maxLength)
    {
        if (str is null)
        {
            return;
        }

        if (str.Length > maxLength)
        {
            throw new InvalidParameterException($"String exceeds maximum length of {maxLength} characters.");
        }
    }

    public static void MinMaxLimit(int val, int min, int max)
    {
        if (val < min || val > max)
        {
            throw new InvalidParameterException($"Value is out of range [{min} {max}].");
        }
    }
}

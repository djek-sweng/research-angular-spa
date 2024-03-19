namespace MyMDb.Identity.Models;

public class Token
{
    public string UserId { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public int Expires { get; set; }
    public DateTime ExpiresAt { get; set; }
    public string AccessToken { get; set; } = string.Empty;
    public IReadOnlyList<string> Roles { get; set; } = new List<string>();
}

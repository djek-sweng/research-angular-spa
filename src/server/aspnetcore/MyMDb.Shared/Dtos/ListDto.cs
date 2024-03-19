namespace MyMDb.Shared.Dtos;

public class ListDto
{
    public int Count => Items.Count;
    public IReadOnlyList<object> Items { get; set; } = new List<object>();
}

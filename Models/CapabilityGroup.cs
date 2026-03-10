namespace biggo29.github.io.Models
{
    public class CapabilityGroup
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<string> Items { get; set; } = new();
    }
}

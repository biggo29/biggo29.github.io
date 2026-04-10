namespace biggo29.github.io.Models
{
    public class Recommendation
    {
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorCurrentTitle { get; set; } = string.Empty;
        public string AuthorCurrentCompany { get; set; } = string.Empty;
        public string Relationship { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}

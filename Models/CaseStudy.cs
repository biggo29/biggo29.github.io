namespace biggo29.github.io.Models
{
    public class CaseStudy
    {
        public string Title { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Context { get; set; } = string.Empty;
        public string Responsibilities { get; set; } = string.Empty;
        public string Architecture { get; set; } = string.Empty;
        public string Outcome { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new();
        public List<string> Categories { get; set; } = new();
        public string? RepositoryUrl { get; set; }
        public string? LiveUrl { get; set; }
        public string? DetailsUrl { get; set; }
    }
}

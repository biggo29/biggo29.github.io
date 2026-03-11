namespace biggo29.github.io.Models
{
    public class ExperienceItem
    {
        public string Role { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string? Client { get; set; }
        public string Duration { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public List<string> Accomplishments { get; set; } = new();
        public List<string> Technologies { get; set; } = new();
    }

    public class EducationItem
    {
        public string Degree { get; set; } = string.Empty;
        public string Institution { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string? ResearchTopic { get; set; }
    }
}

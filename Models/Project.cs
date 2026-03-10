namespace biggo29.github.io.Models
{
    public class Project
    {
        public string Title { get; set; } = "";
        public string ShortDescription { get; set; } = "";
        public string FullDescription { get; set; } = "";
        public List<string> Technologies { get; set; } = new();
        public List<string> Categories { get; set; } = new();
        public string ImageUrl { get; set; } = "";
        public string GithubUrl { get; set; } = "";
        public string DemoUrl { get; set; } = "";
        public List<string> KeyFeatures { get; set; } = new();
    }

    public class Skill
    {
        public string Name { get; set; } = "";
        public int Level { get; set; }
        public List<string> SubSkills { get; set; } = new();
    }
}

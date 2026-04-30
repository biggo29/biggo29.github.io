namespace biggo29.github.io.Models
{
    public class MediumSettings
    {
        public string BaseUrl           { get; set; } = "https://api.rss2json.com/v1/api.json";
        public string RssUrl            { get; set; } = "https://medium.com/feed/@biggo29";
        public string ApiKey            { get; set; } = string.Empty;
        public int    Count             { get; set; } = 10;
        public string OrderDir          { get; set; } = "desc";
        public int    DescriptionLength { get; set; } = 150;
    }
}

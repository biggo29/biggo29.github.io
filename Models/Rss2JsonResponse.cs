using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace biggo29.github.io.Models
{
    public class Rss2JsonResponse
    {
        [JsonPropertyName("status")]
        public string Status { get; set; } = string.Empty;

        [JsonPropertyName("items")]
        public List<Rss2JsonItem> Items { get; set; } = new();
    }

    public class Rss2JsonItem
    {
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("link")]
        public string Link { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("content")]
        public string Content { get; set; } = string.Empty;

        [JsonPropertyName("pubDate")]
        public string PubDate { get; set; } = string.Empty;

        [JsonPropertyName("thumbnail")]
        public string Thumbnail { get; set; } = string.Empty;
    }
}
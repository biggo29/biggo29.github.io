using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using biggo29.github.io.Models;

namespace biggo29.github.io.Services
{
    public class MediumService
    {
        private readonly HttpClient _http;

        private const string FeedUrl =
            "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@biggo29&count=10&order_dir=desc";

        // Matches the first <img src="..."> in HTML content
        private static readonly Regex ImgSrcRegex =
            new(@"<img[^>]+src=[""']([^""']+)[""']", RegexOptions.IgnoreCase | RegexOptions.Singleline, TimeSpan.FromSeconds(2));

        public MediumService(HttpClient http)
        {
            _http = http;
        }

        public async Task<List<MediumArticle>> GetArticlesAsync()
        {
            try
            {
                var request = new HttpRequestMessage(HttpMethod.Get, FeedUrl);
                request.Headers.CacheControl = new System.Net.Http.Headers.CacheControlHeaderValue
                {
                    NoCache = true,
                    NoStore = true
                };

                var httpResponse = await _http.SendAsync(request);
                var response = await httpResponse.Content.ReadFromJsonAsync<Rss2JsonResponse>();

                if (response?.Items == null) return new();

                return response.Items
                    .Select(item => new MediumArticle
                    {
                        Title       = item.Title,
                        Link        = item.Link,
                        Thumbnail   = ResolveThumbnail(item),
                        PubDate     = FormatDate(item.PubDate),
                        Description = Truncate(StripHtml(item.Description)),
                    })
                    .ToList();
            }
            catch
            {
                return new();
            }
        }

        // Prefer the explicit thumbnail; fall back to first <img> in content
        private static string ResolveThumbnail(Rss2JsonItem item)
        {
            if (!string.IsNullOrWhiteSpace(item.Thumbnail))
                return item.Thumbnail;

            var match = ImgSrcRegex.Match(item.Content);
            return match.Success ? match.Groups[1].Value : string.Empty;
        }

        private static string StripHtml(string html) =>
            Regex.Replace(html, "<.*?>", string.Empty, RegexOptions.Singleline);

        private static string Truncate(string text)
        {
            text = text.Trim();
            return text.Length <= 150 ? text : text[..150].TrimEnd() + "...";
        }

        private static string FormatDate(string raw) =>
            DateTime.TryParse(raw, out var dt) ? dt.ToString("MMM dd, yyyy") : raw;
    }
}
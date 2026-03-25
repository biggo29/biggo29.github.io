using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using biggo29.github.io.Models;
using Microsoft.Extensions.Options;

namespace biggo29.github.io.Services
{
    public class MediumService
    {
        private readonly HttpClient     _http;
        private readonly MediumSettings _settings;

        // Matches the first <img src="..."> in HTML content
        private static readonly Regex ImgSrcRegex =
            new(@"<img[^>]+src=[""']([^""']+)[""']", RegexOptions.IgnoreCase | RegexOptions.Singleline, TimeSpan.FromSeconds(2));

        public MediumService(HttpClient http, IOptions<MediumSettings> options)
        {
            _http     = http;
            _settings = options.Value;
        }

        public async Task<List<MediumArticle>> GetArticlesAsync()
        {
            try
            {
                var request = new HttpRequestMessage(HttpMethod.Get, BuildFeedUrl());
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

        private string BuildFeedUrl()
        {
            var sb = new StringBuilder(_settings.BaseUrl);
            sb.Append($"?rss_url={Uri.EscapeDataString(_settings.RssUrl)}");
            sb.Append($"&count={_settings.Count}");
            sb.Append($"&order_dir={_settings.OrderDir}");

            if (!string.IsNullOrWhiteSpace(_settings.ApiKey))
                sb.Append($"&api_key={_settings.ApiKey}");

            return sb.ToString();
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

        private string Truncate(string text)
        {
            text = text.Trim();
            return text.Length <= _settings.DescriptionLength
                ? text
                : text[.._settings.DescriptionLength].TrimEnd() + "...";
        }

        private static string FormatDate(string raw) =>
            DateTime.TryParse(raw, out var dt) ? dt.ToString("MMM dd, yyyy") : raw;
    }
}

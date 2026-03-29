namespace biggo29.github.io.Models
{
    public class Certificate
    {
        public string Title { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public string IssuedDate { get; set; } = string.Empty;
        public string? CredentialId { get; set; }
        public string? CredentialUrl { get; set; }
        public string? FilePath { get; set; }
        public string Category { get; set; } = string.Empty;
    }
}

# Blazor Portfolio - Shoaib Shahriar

A modern, interactive portfolio website built with **Blazor WebAssembly** and hosted on GitHub Pages.

## 🚀 Features

- **Fully Client-Side**: Blazor WebAssembly SPA with no backend required
- **Modern Design**: Clean, responsive UI with dark/light mode toggle
- **Interactive Projects**: Filterable project cards with modal details
- **Animated Skills**: Dynamic skill bars and competency showcase
- **GitHub Integration**: Live GitHub stats using GitHub Readme Stats API
- **SEO Optimized**: Meta tags for social sharing and search engines
- **Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Fade-in effects, hover transitions, and scroll behavior

## 📋 Project Structure

```
biggo29.github.io/
├── Pages/
│   └── Home.razor              # Main portfolio page
├── Shared/
│   └── MainLayout.razor        # Layout component with header/footer
├── Models/
│   └── Project.cs              # Data models
├── wwwroot/
│   ├── css/
│   │   └── app.css             # Main stylesheet
│   ├── js/
│   │   └── site.js             # JavaScript interop
│   ├── images/                 # Project images and icons
│   │   ├── profile-placeholder.svg
│   │   ├── project-ecommerce.svg
│   │   ├── project-cbvmp.svg
│   │   ├── project-api-gateway.svg
│   │   ├── project-healthcare.svg
│   │   └── project-analytics.svg
│   └── index.html              # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── App.razor                   # Root component
├── Program.cs                  # Application entry
├── _Imports.razor              # Global imports
├── biggo29.github.io.csproj      # Project file
└── README.md                   # This file
```

## 🛠️ Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- Visual Studio 2022, VS Code, or Rider
- Git

## 🏃 Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/biggo29/biggo29.github.io.git
   cd biggo29.github.io
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Run the application**
   ```bash
   dotnet run
   ```

4. **Open in browser**
   - Navigate to `https://localhost:5001` or `http://localhost:5000`

## 📦 Building for Production

```bash
dotnet publish -c Release -o ./publish
```

The compiled output will be in the `./publish/wwwroot` folder.

## 🌐 Deploying to GitHub Pages

### Method 1: Automatic Deployment (Recommended)

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)

2. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

3. **GitHub Actions will automatically:**
   - Build the Blazor app
   - Publish to `wwwroot`
   - Deploy to `gh-pages` branch
   - Your site will be live at `https://biggo29.github.io/biggo29.github.io/`

### Method 2: Manual Deployment

1. **Build and publish**
   ```bash
   dotnet publish -c Release
   ```

2. **Update base href in index.html**
   - Change `<base href="/" />` to `<base href="/biggo29.github.io/" />`

3. **Add .nojekyll file**
   ```bash
   cd bin/Release/net8.0/publish/wwwroot
   touch .nojekyll
   ```

4. **Push to gh-pages branch**
   ```bash
   git subtree push --prefix bin/Release/net8.0/publish/wwwroot origin gh-pages
   ```

## 🎨 Customization

### Update Personal Information

Edit `Pages/Home.razor`:

```csharp
// Update hero section
<h1 class="hero-title">Your Name</h1>
<h2 class="hero-subtitle">Your Title</h2>
<p class="hero-description">Your bio...</p>

// Update contact information
<a href="mailto:your.email@example.com">your.email@example.com</a>
<a href="https://linkedin.com/in/yourprofile">linkedin.com/in/yourprofile</a>
```

### Add/Modify Projects

Edit the `projects` list in `Pages/Home.razor`:

```csharp
private List<Project> projects = new()
{
    new Project
    {
        Title = "Your Project",
        ShortDescription = "Brief description",
        FullDescription = "Detailed description",
        Technologies = new() { "Tech1", "Tech2", "Tech3" },
        ImageUrl = "images/your-project.svg",
        GithubUrl = "https://github.com/yourusername/repo",
        DemoUrl = "https://demo.example.com",
        KeyFeatures = new()
        {
            "Feature 1",
            "Feature 2",
            "Feature 3"
        }
    }
};
```

### Update Skills

Edit the `skills` list in `Pages/Home.razor`:

```csharp
private List<Skill> skills = new()
{
    new Skill 
    { 
        Name = "Your Skill", 
        Level = 90, 
        SubSkills = new() { "Sub1", "Sub2", "Sub3" } 
    }
};
```

### Change GitHub Stats

Update the GitHub username in the stats URLs in `Pages/Home.razor`:

```html
<img src="https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&..." />
```

### Customize Colors

Edit CSS variables in `wwwroot/css/app.css`:

```css
:root {
    --primary-color: #0066ff;      /* Change primary color */
    --secondary-color: #00d4ff;    /* Change secondary color */
    --accent-color: #ff6b6b;       /* Change accent color */
}
```

### Replace Images

Replace placeholder SVG files in `wwwroot/images/` with your actual project screenshots or create new SVG illustrations.

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🔧 Troubleshooting

### Issue: 404 Error on GitHub Pages

**Solution**: Ensure the `<base href>` in `index.html` matches your repository name:
```html
<base href="/biggo29.github.io/" />
```

### Issue: CSS/JS Not Loading

**Solution**: Clear browser cache or add `.nojekyll` file to disable Jekyll processing.

### Issue: GitHub Stats Not Showing

**Solution**: Verify your GitHub username is correct in the stats URLs and that your profile is public.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

- **Email**: shoaib.shahriar@example.com
- **LinkedIn**: [linkedin.com/in/shoaib-shahriar](https://linkedin.com/in/shoaib-shahriar)
- **GitHub**: [github.com/biggo29](https://github.com/biggo29)
- **Portfolio**: [biggo29.github.io](https://biggo29.github.io)

---

Built with ❤️ using Blazor WebAssembly
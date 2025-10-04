# Complete Setup Guide for Blazor Portfolio

This guide will walk you through setting up and deploying your Blazor WebAssembly portfolio from scratch.

## 📁 Project Structure Setup

Create the following folder structure:

```
biggo29.github.io/
├── Pages/
├── Shared/
├── Models/
├── Properties/
├── wwwroot/
│   ├── css/
│   ├── js/
│   └── images/
└── .github/
    └── workflows/
```

## 📝 Files to Create

### 1. Root Directory Files

- `biggo29.github.io.csproj`
- `Program.cs`
- `App.razor`
- `_Imports.razor`
- `.gitignore`
- `README.md`

### 2. Pages Folder

- `Pages/Home.razor`

### 3. Shared Folder

- `Shared/MainLayout.razor`

### 4. Models Folder

- `Models/Project.cs`

### 5. Properties Folder

- `Properties/launchSettings.json`

### 6. wwwroot Folder

- `wwwroot/index.html`
- `wwwroot/css/app.css`
- `wwwroot/js/site.js`
- `wwwroot/images/` (all SVG files)

### 7. GitHub Actions

- `.github/workflows/deploy.yml`

## 🎯 Step-by-Step Setup

### Step 1: Create New Blazor WebAssembly Project

```bash
# Using .NET CLI
dotnet new blazorwasm -o biggo29.github.io
cd biggo29.github.io

# Or using Visual Studio
# File → New → Project → Blazor WebAssembly App
```

### Step 2: Replace Default Files

Replace the default generated files with the provided code for:
- `Program.cs`
- `App.razor`
- `_Imports.razor`
- `wwwroot/index.html`

### Step 3: Delete Unnecessary Default Files

```bash
# Remove sample pages and components
rm -rf Pages/Counter.razor
rm -rf Pages/FetchData.razor
rm -rf Pages/Weather.razor
rm -rf Shared/NavMenu.razor
rm -rf Shared/SurveyPrompt.razor
```

### Step 4: Add Your Files

Copy all provided files to their respective folders.

### Step 5: Update Personal Information

Edit `Pages/Home.razor` and replace:
- Your name
- Title
- Bio
- Contact links
- Projects
- Skills
- Years of experience

### Step 6: Test Locally

```bash
dotnet restore
dotnet build
dotnet run
```

Open `https://localhost:5001` in your browser.

## 🚀 GitHub Pages Deployment

### Step 1: Create GitHub Repository

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: Blazor portfolio"

# Create repo on GitHub (via website)
# Then connect local to remote
git remote add origin https://github.com/biggo29/biggo29.github.io.git
git branch -M main
git push -u origin main
```

### Step 2: Configure GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section
3. Source: Deploy from a branch
4. Select branch: `gh-pages` (will be created by GitHub Actions)
5. Click Save

### Step 3: Update Base Href

The GitHub Actions workflow automatically updates the base href, but if deploying manually:

In `wwwroot/index.html`, change:
```html
<base href="/" />
```
to:
```html
<base href="/biggo29.github.io/" />
```

**Note**: Replace `biggo29.github.io` with your actual repository name.

### Step 4: Wait for Deployment

- GitHub Actions will automatically build and deploy
- Check the Actions tab to monitor progress
- Once complete, visit `https://biggo29.github.io/biggo29.github.io/`

## 🎨 Customization Checklist

### Personal Information
- [ ] Update name in `Home.razor`
- [ ] Update title/role
- [ ] Update bio description
- [ ] Update years of experience
- [ ] Update email address
- [ ] Update LinkedIn URL
- [ ] Update GitHub username
- [ ] Update portfolio URL

### Projects
- [ ] Add real project data
- [ ] Update project titles
- [ ] Update descriptions
- [ ] Add correct GitHub repo URLs
- [ ] Add demo URLs (if available)
- [ ] Update technology stacks
- [ ] Add key features
- [ ] Replace placeholder images

### Skills
- [ ] Update skill names
- [ ] Adjust proficiency levels
- [ ] Add/remove sub-skills
- [ ] Update competency areas

### Images
- [ ] Replace `profile-placeholder.svg` with your photo
- [ ] Add actual project screenshots
- [ ] Create custom project illustrations
- [ ] Add favicon.png

### Styling
- [ ] Customize color scheme
- [ ] Adjust fonts (if desired)
- [ ] Modify animations
- [ ] Update responsive breakpoints

### SEO
- [ ] Update meta description
- [ ] Update meta keywords
- [ ] Add Open Graph image
- [ ] Update page title

## 🔧 Advanced Configuration

### Custom Domain

1. Add CNAME file to `wwwroot/`:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   - Add A records pointing to GitHub Pages IPs
   - Or add CNAME record pointing to `biggo29.github.io`

3. Enable HTTPS in GitHub Pages settings

### Analytics Integration

Add to `wwwroot/index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Contact Form Integration

To add a working contact form, integrate with:
- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [EmailJS](https://www.emailjs.com/)

Example with Formspree:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

## 📊 Performance Optimization

### Image Optimization
- Use WebP format for photos
- Optimize SVGs with SVGO
- Use appropriate image dimensions
- Implement lazy loading

### Code Splitting
Blazor automatically handles code splitting, but you can further optimize:

```csharp
@code {
    [Inject] private Lazy<IMyService> MyService { get; set; }
}
```

### Caching
Add to `wwwroot/index.html`:

```html
<meta http-equiv="Cache-Control" content="public, max-age=31536000">
```

## 🐛 Common Issues & Solutions

### Issue 1: Blank Page on GitHub Pages
**Cause**: Incorrect base href
**Solution**: Ensure base href matches: `<base href="/RepositoryName/" />`

### Issue 2: 404 on Refresh
**Cause**: GitHub Pages doesn't handle SPA routing
**Solution**: The workflow automatically creates 404.html that redirects to index.html

### Issue 3: Styles Not Loading
**Cause**: Base href or path issues
**Solution**: Check browser console, verify all paths relative to base href

### Issue 4: Large Bundle Size
**Cause**: Including unnecessary libraries
**Solution**: Remove unused PackageReferences from .csproj

### Issue 5: Slow Initial Load
**Cause**: Blazor WebAssembly needs to download .NET runtime
**Solution**: 
- Enable Brotli compression
- Consider Blazor Server for faster initial load
- Implement progressive web app (PWA) features

## 📱 Progressive Web App (PWA) Setup

Add to `biggo29.github.io.csproj`:

```xml
<ServiceWorkerAssetsManifest>service-worker-assets.js</ServiceWorkerAssetsManifest>
```

Create `wwwroot/manifest.json`:

```json
{
  "name": "Shoaib Shahriar Portfolio",
  "short_name": "SS Portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0e27",
  "theme_color": "#0066ff",
  "icons": [
    {
      "src": "icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}
```

## 🎓 Learning Resources

- [Blazor Documentation](https://docs.microsoft.com/aspnet/core/blazor)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Blazor University](https://blazor-university.com/)

## 🆘 Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/biggo29/biggo29.github.io/issues)
2. Review GitHub Actions logs
3. Check browser developer console
4. Verify all file paths and naming

## ✅ Final Checklist

Before going live:

- [ ] Test locally (dotnet run)
- [ ] Verify all links work
- [ ] Test responsive design on mobile
- [ ] Check dark/light mode toggle
- [ ] Verify project filters work
- [ ] Test modal popups
- [ ] Check GitHub stats load correctly
- [ ] Validate HTML/CSS
- [ ] Test on multiple browsers
- [ ] Check loading performance
- [ ] Verify SEO meta tags
- [ ] Test contact form (if implemented)

## 🎉 Congratulations!

Your Blazor portfolio is now live! Share it on:
- LinkedIn
- Twitter
- Dev.to
- Your resume
- Business cards

---

Need help? Open an issue or reach out!
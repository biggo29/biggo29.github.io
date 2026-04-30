using biggo29.github.io;
using biggo29.github.io.Models;
using biggo29.github.io.Services;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.Configure<MediumSettings>(builder.Configuration.GetSection("Medium"));
builder.Services.AddScoped<MediumService>();

await builder.Build().RunAsync();

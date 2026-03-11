using biggo29.github.io.Models;

namespace biggo29.github.io.Data
{
    public static class PortfolioData
    {
        public static readonly List<ImpactItem> ImpactItems = new()
        {
            new ImpactItem
            {
                Icon = "🏗️",
                Title = "Enterprise Backend Engineering",
                Description = "Led backend engineering for eSpares.co.uk, a high-traffic UK eCommerce platform serving 15,000+ daily users and supporting £1M+ monthly sales.",
                Metric = "15,000+ Daily Users"
            },
            new ImpactItem
            {
                Icon = "🔗",
                Title = "Microservices Architecture",
                Description = "Architected and delivered 30+ microservices using CQRS, NServiceBus, and Clean Architecture with 99%+ test coverage and near-zero production defects.",
                Metric = "30+ Microservices"
            },
            new ImpactItem
            {
                Icon = "🏆",
                Title = "WSIS Award 2021",
                Description = "Key contributor to the award-winning CBVMP — a national e-Governance biometric verification platform integrating all telecom operators in Bangladesh.",
                Metric = "100M+ SIM Holders"
            },
            new ImpactItem
            {
                Icon = "🤖",
                Title = "AI-Assisted Engineering",
                Description = "Integrated Agentic AI workflows (GitHub Copilot, Claude, ChatGPT, Gemini) across engineering teams to accelerate delivery and improve code quality.",
                Metric = "20% Faster Deployments"
            }
        };

        public static readonly List<CaseStudy> CaseStudies = new()
        {
            new CaseStudy
            {
                Title = "UK eCommerce Platform — eSpares.co.uk",
                Role = "Lead Software Engineer",
                Context = "Enterprise eCommerce platform for Connect Distribution Services Ltd. / ScrewfixSpares (Kingfisher PLC), serving the UK home appliance spare parts market with 15,000+ daily users.",
                Responsibilities = "Led a team of 8–10 engineers delivering scalable backend services and RESTful APIs. Owned end-to-end delivery including business analysis, solution architecture, stakeholder alignment with UK teams, WMS features, and integration of Agentic AI development workflows.",
                Architecture = "30+ microservices using CQRS and NServiceBus. Clean Architecture with strict separation of concerns. Azure DevOps CI/CD. SQL Server for high-volume data. RBAC and GDPR-compliant secure API design.",
                Outcome = "99.9% platform uptime. 20% faster deployment cycles. 99%+ unit test coverage. Near-zero post-release defects. Supported 15,000+ daily users and £1M+ monthly sales.",
                Technologies = new() { "C#", ".NET 8", "ASP.NET Core", "CQRS", "NServiceBus", "Clean Architecture", "Azure DevOps", "SQL Server", "TDD", "XUnit", "MSpec", "Docker" },
                Categories = new() { "DotNet", "Microservices", "Cloud", "Architecture" },
                RepositoryUrl = null,
                LiveUrl = "https://www.espares.co.uk/",
                DetailsUrl = null
            },
            new CaseStudy
            {
                Title = "CBVMP — National Biometric Verification Platform",
                Role = "Backend Engineer",
                Context = "Central Biometric Verification Monitoring Platform (CBVMP) for BTRC (Bangladesh Telecommunication Regulatory Commission), integrating with all telecom operators in Bangladesh for national SIM biometric verification at government scale.",
                Responsibilities = "Key contributor to backend engineering using Java, Servlet, and Oracle. Developed real-time monitoring with ELK Stack (Kibana, Elasticsearch, Logstash). Integrated with all telecom operators for biometric verification at national scale.",
                Architecture = "Java, Servlet, and Oracle backend. ELK Stack for real-time observability. High-availability design sustaining 500 TPS peak capacity with zero-downtime operations.",
                Outcome = "WSIS Award 2021 winner (Action Line C5). Enabled biometric verification for 100M+ SIM/MSISDN holders. 500 TPS peak capacity (usual 20–50 TPS). Maintained the longest zero-downtime record in any e-Governance application in Bangladesh.",
                Technologies = new() { "Java", "Servlet", "Oracle", "Elasticsearch", "Logstash", "Kibana", "ELK Stack" },
                Categories = new() { "PublicSector", "Architecture" },
                RepositoryUrl = null,
                LiveUrl = null,
                DetailsUrl = "https://www.itu.int/net4/wsis/stocktaking/Prizes/2021/DetailsPopup/15804722766144252"
            },
            new CaseStudy
            {
                Title = "e-TIN Solutions — National Board of Revenue",
                Role = "Backend Engineer",
                Context = "e-TIN registration, verification, and API platform for the National Board of Revenue (NBR), Bangladesh — enabling taxpayers and government stakeholders to interact with the national tax system.",
                Responsibilities = "Designed and enhanced e-TIN registration APIs and verification workflows using ASP.NET Core and SQL Server. Integrated with multiple government systems and stakeholders to streamline taxpayer services nationwide.",
                Architecture = "ASP.NET Core RESTful APIs with SQL Server. Secure API design patterns with government-grade integration. Multi-stakeholder integration across national systems.",
                Outcome = "Integrated with multiple government stakeholders nationwide. Increased tax compliance and broadened revenue coverage. Streamlined e-TIN registration and verification for citizens across Bangladesh.",
                Technologies = new() { "C#", "ASP.NET Core", "SQL Server", "RESTful APIs", "Web API" },
                Categories = new() { "DotNet", "PublicSector", "APIs" },
                RepositoryUrl = null,
                LiveUrl = "https://secure.incometax.gov.bd/",
                DetailsUrl = null
            }
        };

        public static readonly List<ArchitecturePrinciple> ArchitecturePrinciples = new()
        {
            new ArchitecturePrinciple
            {
                Icon = "🏗️",
                Title = "Design for Change",
                Description = "Systems should evolve easily. Abstractions, clear interfaces, and modular boundaries allow features to be added or replaced with minimal friction."
            },
            new ArchitecturePrinciple
            {
                Icon = "📦",
                Title = "Explicit Service Boundaries",
                Description = "Clear ownership and contracts between services prevent coupling. Each service should have a well-defined responsibility and interface."
            },
            new ArchitecturePrinciple
            {
                Icon = "⚡",
                Title = "CQRS Where Complexity Justifies It",
                Description = "Separating read and write models improves scalability and clarity in complex domains — applied deliberately, not by default."
            },
            new ArchitecturePrinciple
            {
                Icon = "📊",
                Title = "Observability by Design",
                Description = "Logging, metrics, and tracing should be built in from day one — not added after production incidents. Systems must be understandable in production."
            },
            new ArchitecturePrinciple
            {
                Icon = "🔄",
                Title = "Automation Over Manual Operations",
                Description = "CI/CD pipelines, automated tests, and release gates replace manual processes. Reliability and speed improve when humans are removed from repetitive steps."
            },
            new ArchitecturePrinciple
            {
                Icon = "🔧",
                Title = "Maintainability Over Shortcuts",
                Description = "Long-term code health matters more than short-term velocity. Clean architecture, disciplined code reviews, and TDD pay compounding dividends over time."
            }
        };

        public static readonly List<CapabilityGroup> CapabilityGroups = new()
        {
            new CapabilityGroup
            {
                Title = "Core Backend Development",
                Description = "Building scalable, production-grade server-side systems",
                Items = new() { "C#", "ASP.NET Core", "RESTful APIs", "Web API", "EF Core", "LINQ", "Async Programming", "Dependency Injection", "Middleware", "Output Caching" }
            },
            new CapabilityGroup
            {
                Title = "Architecture & Patterns",
                Description = "Designing maintainable, scalable system architectures",
                Items = new() { "Clean Architecture", "CQRS", "Event-Driven Architecture", "Microservices", "Domain-Driven Design", "NServiceBus", "Scheduled Jobs (Cron)" }
            },
            new CapabilityGroup
            {
                Title = "API & Security",
                Description = "Secure, standards-compliant API design",
                Items = new() { "Swagger / OpenAPI", "JWT", "OAuth2", "RBAC", "Secure API Design", "GDPR Compliance" }
            },
            new CapabilityGroup
            {
                Title = "Cloud & DevOps",
                Description = "Delivering and operating reliable production systems",
                Items = new() { "Azure DevOps", "CI/CD Pipeline Design", "Docker", "Observability", "Logging", "Monitoring", "Release Governance" }
            },
            new CapabilityGroup
            {
                Title = "Databases",
                Description = "High-volume data storage and query optimization",
                Items = new() { "Microsoft SQL Server", "Oracle", "MySQL" }
            },
            new CapabilityGroup
            {
                Title = "Testing & Quality",
                Description = "Engineering reliability through disciplined quality practices",
                Items = new() { "TDD", "XUnit", "MSpec", "Moq", "Unit Testing", "Integration Testing", "Code Reviews", "99%+ Coverage" }
            },
            new CapabilityGroup
            {
                Title = "AI-Assisted Development",
                Description = "Leveraging AI tooling for accelerated, high-quality delivery",
                Items = new() { "GitHub Copilot", "ChatGPT", "Claude", "Gemini", "Prompt Engineering", "Agentic AI Workflows" }
            },
            new CapabilityGroup
            {
                Title = "Leadership & Collaboration",
                Description = "Guiding teams and driving cross-functional delivery",
                Items = new() { "Technical Leadership", "Agile / Scrum", "Mentoring", "Code Review", "Stakeholder Management", "Task Estimation", "Confluence", "Draw.io" }
            }
        };

        public static readonly List<ExperienceItem> ExperienceItems = new()
        {
            new ExperienceItem
            {
                Role = "Lead Software Engineer",
                Company = "EchoLogyx Ltd.",
                Client = "Connect Distribution Services Ltd. / ScrewfixSpares (Kingfisher PLC)",
                Duration = "Aug 2024 – Sep 2025",
                Summary = "Led backend engineering for eSpares.co.uk, a high-traffic UK eCommerce platform, managing a team of 8–10 engineers.",
                Accomplishments = new()
                {
                    "Led and mentored 8–10 engineers delivering scalable backend services and RESTful APIs, achieving 99.9% uptime and 20% faster deployment cycles",
                    "Owned end-to-end delivery including business analysis, solution architecture, and stakeholder alignment with UK business and operations teams",
                    "Guided development across microservices and integrations using CQRS, Clean Architecture, and TDD with 99%+ test coverage",
                    "Contributed to both eCommerce and Warehouse Management System (WMS) features including inventory workflows and system integrations",
                    "Integrated Agentic AI workflows (GitHub Copilot, Claude, ChatGPT, Gemini) to accelerate delivery and improve engineering productivity"
                },
                Technologies = new() { "C#", ".NET 8", "ASP.NET Core", "CQRS", "NServiceBus", "Clean Architecture", "Azure DevOps", "SQL Server", "TDD" }
            },
            new ExperienceItem
            {
                Role = "Senior Software Engineer",
                Company = "EchoLogyx Ltd.",
                Client = "Connect Distribution Services Ltd. / ScrewfixSpares (Kingfisher PLC)",
                Duration = "Nov 2020 – Jul 2024",
                Summary = "Key contributor to the design and evolution of eSpares.co.uk across 30+ microservices supporting 15,000+ daily users and £1M+ monthly sales.",
                Accomplishments = new()
                {
                    "Architected scalable backend services and REST APIs across 30+ microservices using CQRS, NServiceBus, and Azure DevOps",
                    "Achieved 99% unit test coverage through TDD (XUnit, MSpec), reducing production defects to near zero",
                    "Delivered business-driven features in collaboration with product, warehouse, and operations teams",
                    "Optimized SQL Server performance for high-volume workloads supporting 1M+ products across the UK and Ireland"
                },
                Technologies = new() { "C#", "ASP.NET Core", "CQRS", "NServiceBus", "Azure DevOps", "SQL Server", "XUnit", "MSpec" }
            },
            new ExperienceItem
            {
                Role = "Programmer",
                Company = "Synesis IT PLC",
                Client = null,
                Duration = "Dec 2017 – Nov 2020",
                Summary = "Developed national-scale e-Governance platforms and SaaS solutions for government and enterprise clients in Bangladesh.",
                Accomplishments = new()
                {
                    "Key contributor to the WSIS Award 2021-winning CBVMP for BTRC — biometric verification for 100M+ SIM holders at 500 TPS capacity",
                    "Developed real-time log monitoring with Kibana, Elasticsearch, and Logstash, enabling faster issue detection",
                    "Designed and enhanced e-TIN solutions and APIs for the National Board of Revenue using ASP.NET Core and SQL Server",
                    "Developed SaaS-based e-Governance solutions using Java, C#, ASP.NET Core, Oracle, and SQL Server"
                },
                Technologies = new() { "Java", "Servlet", "Oracle", "C#", "ASP.NET Core", "SQL Server", "ELK Stack" }
            },
            new ExperienceItem
            {
                Role = ".NET Developer",
                Company = "RMG Networks",
                Client = "Dallas, TX, USA (Remote)",
                Duration = "Jan 2017 – Dec 2017",
                Summary = "Built desktop applications for digital signage solutions for a US-based client, working fully remote.",
                Accomplishments = new()
                {
                    "Built desktop applications for digital signage solutions using C#, WCF, and WPF"
                },
                Technologies = new() { "C#", "WCF", "WPF", "RCF" }
            }
        };

        public static readonly List<EducationItem> EducationItems = new()
        {
            new EducationItem
            {
                Degree = "M.Sc. in Computer Science and Engineering",
                Institution = "Jahangirnagar University, Dhaka, Bangladesh",
                Duration = "Jan 2018 – Jun 2019",
                ResearchTopic = "Sales forecasting using time series analysis"
            },
            new EducationItem
            {
                Degree = "B.Sc. in Computer Science",
                Institution = "American International University-Bangladesh (AIUB), Dhaka, Bangladesh",
                Duration = "May 2013 – Dec 2016",
                ResearchTopic = "Human health monitoring system using Wireless Sensor Body Area Network (WSBAN)"
            }
        };
    }
}

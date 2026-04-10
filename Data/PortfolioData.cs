using biggo29.github.io.Models;

namespace biggo29.github.io.Data
{
    public static class PortfolioData
    {
        public static readonly List<ImpactItem> ImpactItems = new()
        {
            new ImpactItem
            {
                Icon = "server",
                Title = "Enterprise Backend Engineering",
                Description = "Led backend engineering for eSpares.co.uk, a high-traffic UK eCommerce platform serving 15,000+ daily users and supporting £1M+ monthly sales.",
                Metric = "15,000+ Daily Users"
            },
            new ImpactItem
            {
                Icon = "link",
                Title = "Microservices Architecture",
                Description = "Architected and delivered 30+ microservices using CQRS, NServiceBus, and Clean Architecture with 99%+ test coverage and near-zero production defects.",
                Metric = "30+ Microservices"
            },
            new ImpactItem
            {
                Icon = "trophy",
                Title = "WSIS Award 2021",
                Description = "Key contributor to the award-winning CBVMP — a national e-Governance biometric verification platform integrating all telecom operators in Bangladesh.",
                Metric = "100M+ SIM Holders"
            },
            new ImpactItem
            {
                Icon = "sparkles",
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
                DetailsUrl = "https://www.itu.int/net4/wsis/stocktaking/Prizes/Prizes/Details/16115777478941397"
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
                Icon = "layers",
                Title = "Design for Change",
                Description = "Systems should evolve easily. Abstractions, clear interfaces, and modular boundaries allow features to be added or replaced with minimal friction."
            },
            new ArchitecturePrinciple
            {
                Icon = "box",
                Title = "Explicit Service Boundaries",
                Description = "Clear ownership and contracts between services prevent coupling. Each service should have a well-defined responsibility and interface."
            },
            new ArchitecturePrinciple
            {
                Icon = "bolt",
                Title = "CQRS Where Complexity Justifies It",
                Description = "Separating read and write models improves scalability and clarity in complex domains — applied deliberately, not by default."
            },
            new ArchitecturePrinciple
            {
                Icon = "chart",
                Title = "Observability by Design",
                Description = "Logging, metrics, and tracing should be built in from day one — not added after production incidents. Systems must be understandable in production."
            },
            new ArchitecturePrinciple
            {
                Icon = "arrow-path",
                Title = "Automation Over Manual Operations",
                Description = "CI/CD pipelines, automated tests, and release gates replace manual processes. Reliability and speed improve when humans are removed from repetitive steps."
            },
            new ArchitecturePrinciple
            {
                Icon = "wrench",
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

        public static readonly List<Certificate> Certificates = new()
        {
            new Certificate
            {
                Title = "SAP ERP Essential Training",
                Issuer = "LinkedIn Learning",
                IssuedDate = "Mar 01, 2026",
                CredentialId = null,
                CredentialUrl = null,
                FilePath = "/files/certificates/CertificateOfCompletion_SAP ERP Essential Training.pdf",
                Category = "Development"
            },
            new Certificate
            {
                Title = "Claude Code in Action",
                Issuer = "Anthropic",
                IssuedDate = "Mar 29, 2026",
                CredentialId = null,
                CredentialUrl = null,
                FilePath = "/files/certificates/ClaudeCodeInAction.pdf",
                Category = "AI"
            },
            new Certificate
            {
                Title = "Learning Docker",
                Issuer = "LinkedIn Learning",
                IssuedDate = "Aug 10, 2023",
                CredentialId = null,
                CredentialUrl = null,
                FilePath = "/files/certificates/CertificateOfCompletion_Learning Docker.pdf",
                Category = "Cloud"
            },
            new Certificate
            {
                Title = "ASP.NET: Security",
                Issuer = "LinkedIn Learning",
                IssuedDate = "Apr 18, 2022",
                CredentialId = null,
                CredentialUrl = null,
                FilePath = "/files/certificates/CertificateOfCompletion_ASP.NET Security.pdf",
                Category = "Development"
            },
            new Certificate
            {
                Title = "ASP.NET MVC 5 Essential Training",
                Issuer = "LinkedIn Learning",
                IssuedDate = "Mar 23, 2022",
                CredentialId = null,
                CredentialUrl = null,
                FilePath = "/files/certificates/CertificateOfCompletion_ASP.NET MVC 5 Essential Training.pdf",
                Category = "Development"
            },
            new Certificate
            {
                Title = "Learning ASP.NET",
                Issuer = "LinkedIn Learning",
                IssuedDate = "Mar 17, 2022",
                CredentialId = null,
                CredentialUrl = null,
                FilePath = "/files/certificates/CertificateOfCompletion_Learning ASP.NET.pdf",
                Category = "Development"
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

        public static readonly List<Recommendation> Recommendations = new()
        {
            // ── Engineering & Technical Leadership ────────────────────────────
            new Recommendation
            {
                AuthorName = "Simon Parry",
                AuthorCurrentTitle = "Lead Developer",
                AuthorCurrentCompany = "Bunzl UK and Ireland",
                Relationship = "Former Team Lead @ EchoLogyx | ScrewfixSpares",
                Category = "Engineering & Technical Leadership",
                Text = "I had the pleasure of working with Shoaib as the C# Team Lead for Screwfix Spares, his ability to follow instructions diligently while being eager to embrace new technologies truly stood out. Shoaib has excellent communication skills which made collaboration seamless, and his approachable nature made him not only easy to work with but also a fantastic member of the team. Shoaib has exceptional technical skills and commendable professionalism.",
                IsActive = true
            },
            new Recommendation
            {
                AuthorName = "Moinul Islam",
                AuthorCurrentTitle = "Head of Software Development & Implementation",
                AuthorCurrentCompany = "Synesis IT PLC",
                Relationship = "Former Team Lead @ Synesis IT PLC",
                Category = "Engineering & Technical Leadership",
                Text = "Shoaib Shahriar was a brilliant person to work with. When you get to connect with him, you'll find a fantastic person! Loyal, insightful, and independent. He had the vision to see the benefits and the passion to turn that into a competitive advantage for Synesis IT. Ambitious and independent expert. He denotes a lot of analytical capability and willingness for both his personal & professional development. He is also creative which is rare for in technical person.",
                IsActive = true
            },
            new Recommendation
            {
                AuthorName = "Mohammad Atiqur Rahman",
                AuthorCurrentTitle = "Senior Manager",
                AuthorCurrentCompany = "Epyllion Group",
                Relationship = "Former Team Member @ EchoLogyx | ScrewfixSpares",
                Category = "Engineering & Technical Leadership",
                Text = "Shoaib's collaborative nature, problem-solving mindset, and mentorship qualities make him an outstanding team player and a dependable leader. I've personally learned a great deal from his ability to analyze complex systems and deliver robust, scalable solutions. Any team would benefit greatly from his presence. I wish him continued success.",
                IsActive = true
            },

            // ── Backend & System Architecture ─────────────────────────────────
            new Recommendation
            {
                AuthorName = "Md Shohanur Rahman",
                AuthorCurrentTitle = "Senior iOS Developer",
                AuthorCurrentCompany = "Cloud Ten Labs (USA)",
                Relationship = "Former Colleague @ RMG Networks",
                Category = "Backend & System Architecture",
                Text = "I had the pleasure of working with Shoaib Shahriar, and I was always impressed by his strong expertise in C# and ASP.NET. He consistently delivered clean, scalable backend solutions and played a key role in ensuring smooth API integrations and system performance. What stands out most is his problem-solving ability and collaborative mindset. He is always ready to support teammates and share knowledge. I highly recommend him as a reliable and talented developer who would be an asset to any team.",
                IsActive = true
            },
            new Recommendation
            {
                AuthorName = "Tom Hodgson",
                AuthorCurrentTitle = "CRO & UX Lead",
                AuthorCurrentCompany = "EchoLogyx Ltd",
                Relationship = "Former UI/UX Manager @ EchoLogyx | ScrewfixSpares",
                Category = "Backend & System Architecture",
                Text = "Shoaib is a talented Software Engineer. His ability to develop to the highest standard to ensure that his tasks are always developed as specified are exceptional. Shoaib is a kind and friendly individual, and that makes his an excellent team player, who will always go that extra step in order to fulfil his work to the best of his potential. Shoaib would make a valuable member for any team that he is a part of.",
                IsActive = true
            },
            new Recommendation
            {
                AuthorName = "Bijon Kumar Dhar",
                AuthorCurrentTitle = "General Manager, Technology",
                AuthorCurrentCompany = "Synesis IT PLC",
                Relationship = "Former Manager",
                Category = "Backend & System Architecture",
                Text = "Shoaib Shahriar, is a very good programmer and his skill set in .Net platform is good. He is a very hard working and also has good analytical skills. He is a very good person and I wish his every success.",
                IsActive = true
            },

            // ── Team Culture & Reliability ────────────────────────────────────
            new Recommendation
            {
                AuthorName = "Faroque Abdullah",
                AuthorCurrentTitle = "Senior Software Engineer II",
                AuthorCurrentCompany = "Cefalo",
                Relationship = "Former Colleague",
                Category = "Team Culture & Reliability",
                Text = "Shoaib is one of the most delightful people I had the pleasure of working. His humor and empathy make a comforting work environment. He consistently gave 100 percent effort to the team and played a very important role in the company. Any team would be lucky to have Shoaib and I will always recommend him to any company interested in working with him.",
                IsActive = true
            },
            new Recommendation
            {
                AuthorName = "Ratul Minhaz",
                AuthorCurrentTitle = "Senior Software Engineer",
                AuthorCurrentCompany = "Axel Springer (Berlin, Germany)",
                Relationship = "University Alumnus & Colleague",
                Category = "Team Culture & Reliability",
                Text = "As university alumni we had the opportunity to work closely in several occasions and I got to know Shoaib as a reliable teammate. We had volunteered together for different organizations and organized sessions on open web technologies. Shoaib has always demonstrated an inherent ability to handle difficult situations with a calm demeanor, so I am very happy to see him rise above his peers in career. I wish him the best!",
                IsActive = true
            },
            new Recommendation
            {
                AuthorName = "Md. Emon Hossain Diza",
                AuthorCurrentTitle = "Consultant Team Lead Manager",
                AuthorCurrentCompany = "CONSTELL GROUP",
                Relationship = "Former Colleague",
                Category = "Team Culture & Reliability",
                Text = "Shoaib Shahriar is very passionate and has great vision for his work. His focus keeps everything moving smoothly, he makes sure all the deadlines are met, and makes sure that whatever project he is working on meets the highest standards.",
                IsActive = true
            }
        };
    }
}

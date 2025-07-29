const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Portfolio data
const portfolioData = {
    personal: {
        name: "Ahmed Jar Rassoul",
        title: "Network Engineer & Cybersecurity Analyst",
        email: "jarrassoul@students.jkuat.ac.ke",
        phone: "+212 625 35 69 32",
        location: "Rabat, Morocco",
        github: "https://github.com/jarrassoul",
        linkedin: "https://linkedin.com/in/ahmed-jar-rassoul"
    },
    about: "Experienced Network Engineer and Cybersecurity Analyst with expertise in telecommunications infrastructure, RF optimization, and network security. Skilled in managing complex network deployments, analyzing security vulnerabilities, and implementing robust cybersecurity measures.",
    skills: {
        technical: [
            "Network Engineering & Design",
            "RF Optimization & Analysis", 
            "Cybersecurity Analysis",
            "Network Security Implementation",
            "Telecommunications Infrastructure",
            "Network Performance Monitoring",
            "Security Vulnerability Assessment",
            "Incident Response & Management"
        ],
        tools: [
            "Wireshark", "Nessus", "Metasploit", "Nmap",
            "MATLAB", "Python", "SQL", "Linux/Unix",
            "Cisco Network Equipment", "RF Planning Tools",
            "Security Information and Event Management (SIEM)",
            "Penetration Testing Tools"
        ]
    },
    experience: [
        {
            title: "RF Optimization Engineer",
            company: "INWI",
            location: "Rabat, Morocco",
            duration: "July 2024 – August 2024",
            responsibilities: [
                "Analyzed and optimized RF network performance for improved coverage and capacity",
                "Conducted field measurements and drive tests to assess network quality",
                "Implemented network optimization strategies resulting in 15% improvement in signal quality",
                "Collaborated with cross-functional teams to resolve network performance issues"
            ]
        },
        {
            title: "Network Engineer Intern",
            company: "Huawei Technologies",
            location: "Rabat, Morocco", 
            duration: "June 2023 – August 2023",
            responsibilities: [
                "Assisted in the design and implementation of telecommunications network infrastructure",
                "Performed network analysis and troubleshooting for enterprise clients",
                "Supported network security assessments and vulnerability testing",
                "Gained hands-on experience with advanced networking equipment and protocols"
            ]
        },
        {
            title: "Network Technician",
            company: "Smart-Solutions",
            location: "Rabat, Morocco",
            duration: "January 2023 – May 2023", 
            responsibilities: [
                "Maintained and configured network infrastructure for small to medium businesses",
                "Implemented cybersecurity best practices and security monitoring systems",
                "Provided technical support and network troubleshooting services",
                "Conducted security awareness training for client organizations"
            ]
        }
    ],
    projects: [
        {
            title: "Network Security Assessment Framework",
            description: "Developed a comprehensive framework for assessing network security vulnerabilities in enterprise environments",
            technologies: ["Python", "Nessus", "Wireshark", "Linux"],
            achievements: [
                "Created automated vulnerability scanning scripts",
                "Implemented network traffic analysis tools", 
                "Reduced security assessment time by 40%"
            ]
        },
        {
            title: "RF Network Optimization System",
            description: "Built an optimization system for analyzing and improving cellular network performance",
            technologies: ["MATLAB", "RF Planning Tools", "SQL", "Python"],
            achievements: [
                "Developed algorithms for coverage prediction and optimization",
                "Improved network capacity by 20% in target areas",
                "Streamlined network planning processes"
            ]
        },
        {
            title: "Cybersecurity Incident Response Platform", 
            description: "Designed and implemented an incident response platform for rapid threat detection and mitigation",
            technologies: ["Python", "SIEM", "Linux", "Security APIs"],
            achievements: [
                "Reduced incident response time by 60%",
                "Integrated multiple security tools into unified dashboard",
                "Automated threat intelligence gathering and analysis"
            ]
        }
    ],
    education: [
        {
            degree: "Master of Science in Cybersecurity",
            school: "Drexel University",
            location: "Philadelphia, PA, USA",
            duration: "2022 – 2024",
            details: "Specialized in network security, digital forensics, and cyber threat analysis"
        },
        {
            degree: "Bachelor of Science in IT | Major: Networking and Telecommunication",
            school: "The Higher Institute of Accounting and Business Administration",
            school_link: "https://iscae.mr/",
            location: "Nouakchott, Mauritania", 
            duration: "September 2013 – June 2016",
            details: "Focus on network infrastructure, RF engineering, and telecommunications systems"
        }
    ]
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { portfolio: portfolioData });
});

// API endpoints
app.get('/api/portfolio', (req, res) => {
    res.json(portfolioData);
});

app.get('/api/skills', (req, res) => {
    res.json(portfolioData.skills);
});

app.get('/api/experience', (req, res) => {
    res.json(portfolioData.experience);
});

app.get('/api/projects', (req, res) => {
    res.json(portfolioData.projects);
});

app.get('/api/education', (req, res) => {
    res.json(portfolioData.education);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
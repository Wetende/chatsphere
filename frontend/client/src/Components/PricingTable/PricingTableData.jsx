const pricingTable01 = [
    {
        title: "BASIC",
        subtitle: "Basic features",
        price: "$9.99",
        term: "monthly",
        plans: [
            `<strong>5</strong> Domains`,
            `<strong>2 GB</strong> File upload`,
            `<strong>20 GB</strong> Secure storage`,
            `<strong>Unlimited</strong> bandwidth`
        ],
        buttonTitle: "Choose plan",
        buttonLink: "/page/pricing-packages",
    },
    {
        title: "STANDARD",
        subtitle: "MOST POPULAR",
        price: "$19.99",
        term: "monthly",
        plans: [
            `<strong>10</strong> Domains`,
            `<strong>2 GB</strong> File upload`,
            `<strong>40 GB</strong> Secure storage`,
            `<strong>Unlimited</strong> bandwidth`
        ],
        buttonTitle: "Choose plan",
        buttonLink: "/page/pricing-packages",
        popular: {
            isPopular: true
        }
    },
    {
        title: "PREMIUM",
        subtitle: "ALL YOU MAY NEED",
        price: "$29.99",
        term: "monthly",
        plans: [
            `<strong>20</strong> Domains`,
            `<strong>4 GB</strong> File upload`,
            `<strong>60 GB</strong> Secure storage`,
            `<strong>Unlimited</strong> bandwidth`
        ],
        buttonTitle: "Choose plan",
        buttonLink: "/page/pricing-packages",
    },
]

const pricingTable02 = [
    {
        icon: "line-icon-Boy",
        title: "STANDARD",
        price: "$800",
        term: "PER MONTH",
        plans: ['Limited hours', 'Limited projects'],
        buttonTitle: "Get started",
        buttonLink: "/page/pricing-packages",
    },
    {
        icon: "line-icon-Business-Mens",
        title: "ADVANCED",
        price: "$1200",
        term: "PER MONTH",
        plans: ['Unlimited hours', 'Unlimited projects', 'Unlimited variations'],
        buttonTitle: "Get started",
        buttonLink: "/page/pricing-packages",
        popular: {
            isPopular: true
        }
    },
    {
        icon: "line-icon-Business-ManWoman",
        title: "BUSINESS",
        price: "$900",
        term: "PER MONTH",
        plans: ['Unlimited hours', 'Unlimited projects'],
        buttonTitle: "Get started",
        buttonLink: "#"
    }

]

const pricingTable03MonthData = [
    {
        icon: "line-icon-Boy",
        title: "BASIC PLAN",
        subtitle: "Basic features",
        price: "$9.99",
        term: "monthly",
        plans: [
            `<strong>5</strong> Domains`,
            `<strong>2 GB</strong> File upload`,
            `<strong>20 GB</strong> Secure storage`,
            `<strong>Unlimited</strong> bandwidth`
        ],
        buttonTitle: "Register now",
        buttonLink: "/page/pricing-packages",

    },
    {
        icon: "line-icon-Business-ManWoman",
        title: "STANDARD PLAN",
        subtitle: "MOST POPULAR",
        price: "$19.99",
        term: "monthly",
        plans: [
            `<strong>10</strong> Domains`,
            `<strong>2 GB</strong> File upload`,
            `<strong>40 GB</strong> Secure storage`,
            `<strong>Unlimited</strong> bandwidth`
        ],
        buttonTitle: "Register now",
        buttonLink: "/page/pricing-packages",
        popular: {
            isPopular: true
        }
    },
    {
        icon: "line-icon-Business-Mens",
        title: "PREMIUM PLAN",
        subtitle: "ALL YOU MAY NEED",
        price: "$29.99",
        term: "monthly",
        plans: [
            `<strong>20</strong> Domains`,
            `<strong>4 GB</strong> File upload`,
            `<strong>60 GB</strong> Secure storage`,
            `<strong>Unlimited</strong> bandwidth`
        ],
        buttonTitle: "Register now",
        buttonLink: "/page/pricing-packages",
    },
]
const pricingTable03YearData = [
    {
        icon: "line-icon-Boy",
        title: "BASIC PLAN",
        subtitle: "Basic features",
        price: "$90.99",
        term: "yearly",
        plans: [
            `<strong>5</strong> Domains`,
            `<strong>2 GB</strong> File upload`,
            `<strong>20 GB</strong> Secure storage`,
            `<strong>Unlimited</strong> bandwidth`
        ],
        buttonTitle: "Register now",
        buttonLink: "/page/pricing-packages",

    },
    {
        icon: "line-icon-Business-ManWoman",
        title: "STANDARD PLAN",
        subtitle: "MOST POPULAR",
        price: "$199.99",
        term: "yearly",
        plans: [
            `<strong>10</strong> Domains`,
            `<strong>2 GB</strong> File upload`,
            `<strong>40 GB</strong> Secure storage`,
            `<strong>Unlimited</strong> bandwidth`
        ],
        buttonTitle: "Register now",
        buttonLink: "/page/pricing-packages",
        popular: {
            isPopular: true
        }
    },
    {
        icon: "line-icon-Business-Mens",
        title: "PREMIUM PLAN",
        subtitle: "ALL YOU MAY NEED",
        price: "$290.99",
        term: "yearly",
        plans: [
            `<strong>20</strong> Domains`,
            `<strong>4 GB</strong> File upload`,
            `<strong>60 GB</strong> Secure storage`,
            `<strong>Unlimited</strong> bandwidth`
        ],
        buttonTitle: "Register now",
        buttonLink: "/page/pricing-packages",
    },
]

const pricingTable04 = [
    {
        title: "BASIC PLAN",
        subtitle: "Core features",
        price: "$29",
        term: "PER YEAR",
        plans: [
            "Pixel perfect design", "Personal applications", "Step by step support"
        ],
        buttonTitle: "Choose Package",
        buttonLink: "/page/pricing-packages",
    },
    {
        title: "STANDARD PLAN",
        subtitle: "Most popular",
        price: "$39",
        term: "PER YEAR",
        plans: [
            "Pixel perfect design", "Personal applications", "Responsive app layout", "Step by step support"

        ],
        buttonTitle: "Choose Package",
        buttonLink: "/page/pricing-packages",
        popular: {
            isPopular: true,
        }
    },
    {
        title: "PREMIUM PLAN",
        subtitle: "Huge features",
        price: "$49",
        term: "PER YEAR",
        plans: [
            "Pixel perfect design", "Personal applications", "Step by step support"

        ],
        buttonTitle: "Choose Package",
        buttonLink: "/page/pricing-packages",
    }
]

export { pricingTable01, pricingTable02, pricingTable03MonthData, pricingTable03YearData, pricingTable04 }
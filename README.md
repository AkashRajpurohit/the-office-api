# The Office Quotes API

Simple JSON API for getting random quotes from "The Office U.S" series.

# API Contract 🫱🏻‍🫲🏼

Base URL - [https://officeapi.akashrajpurohit.com](https://officeapi.akashrajpurohit.com)

## Get random Quote

Request Path - [/quote/random](https://officeapi.akashrajpurohit.com/quote/random)

Response -

```json
{
  "id": 31,
  "character": "Dwight Schrute",
  "quote": "Any time I'm about to do something, I think to myself 'Would an idiot do that?' and if the answer is yes, I do not do that thing."
}
```

## Get Quote by ID

Request Path - [/quote/:id](https://officeapi.akashrajpurohit.com/quote/38)

Response -

```json
{
  "id": 38,
  "character": "Dwight Schrute",
  "quote": "Identity theft is not a joke, Jim! Millions of families suffer every year!"
}
```

# Technology Stack 💻

- Framework - [Hono](https://honojs.dev/)
- Deployment - [Cloudflare Workers](https://workers.cloudflare.com/)

# Bugs or Requests 🐛

If you encounter any problems feel free to open an [issue](https://github.com/AkashRajpurohit/the-office-quotes-api/issues/new?template=bug_report.md). If you feel the project is missing a feature, please raise a [ticket](https://github.com/AkashRajpurohit/the-office-quotes-api/issues/new?template=feature_request.md) on GitHub and I'll look into it. Pull requests are also welcome.

# Contributions 🤝

Please check the [guide](/CONTRIBUTING.md) to learn more about contributing to this project

# Where to find me? 👀

- [Website](https://akashrajpurohit.com/)
- [Linkedin](https://www.linkedin.com/in/AkashRajpurohit)
- [Instagram](https://www.instagram.com/akashwho.codes)
- [Twitter](https://www.twitter.com/akashwhocodes)

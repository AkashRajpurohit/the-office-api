<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/AkashRajpurohit/the-office-api">
    <img src="https://media.tenor.com/sZ8zYU7hT1wAAAAM/dance-party.gif" alt="Micheal is happy" width="150" height="150">
  </a>

  <h3 align="center">The Office API</h3>

  <p align="center">
    <samp>A free restful API serving quotes from "The Office U.S." series.</samp>
    <br />
    <a href="https://akashrajpurohit.github.io/the-office-api/"><strong>Explore the api »</strong></a>
    <br />
    <br />
    <a href="/CONTRIBUTING.md">Contributing</a>
    ·
    <a href="https://github.com/AkashRajpurohit/the-office-quotes-api/issues/new?template=bug_report.md">Bug report</a>
    ·
    <a href="https://github.com/AkashRajpurohit/the-office-quotes-api/issues/new?template=feature_request.md">Feature request</a>
  </p>
</p>

<br/>

# API Contract 🫱🏻‍🫲🏼

Base URL - [https://officeapi.akashrajpurohit.com](https://officeapi.akashrajpurohit.com)

## Get random Quote

Request Path - [/quote/random](https://officeapi.akashrajpurohit.com/quote/random)

Response -

```json
{
  "id": 45,
  "character": "Michael Scott",
  "quote": "I am running away from my responsibilities. And it feels good.",
  "character_avatar_url": "https://i.gyazo.com/5a3113ead3f3541731bf721d317116df.jpg"
}
```

## Get Quote by ID

Request Path - [/quote/:id](https://officeapi.akashrajpurohit.com/quote/156)

Response -

```json
{
  "id": 156,
  "character": "Dwight Schrute",
  "quote": "Everyone, follow me to the shelter. We’ve got enough food for 14 days. After that, we have a difficult conversation.",
  "character_avatar_url": "https://i.gyazo.com/dd60242b96d427eecb431e0668a2ca82.jpg"
}
```

## Get Season by ID

Request Path - [/season/:id](https://officeapi.akashrajpurohit.com/season/1)

Response -

```json
[
  {
    "season": 1,
    "episode": 1,
    "title": "Pilot",
    "description": "The premiere episode introduces the boss and staff of the Dunder-Mifflin Paper Company in Scranton, Pennsylvania in a documentary about the workplace.",
    "airDate": "2005-03-24",
    "imdbRating": 7.4,
    "totalVotes": 7006,
    "directedBy": "Ken Kwapis",
    "writtenBy": "Ricky Gervais & Stephen Merchant and Greg Daniels"
  },
  {
    "season": 1,
    "episode": 2,
    "title": "Diversity Day",
    "description": "Michael's off color remark puts a sensitivity trainer in the office for a presentation, which prompts Michael to create his own.",
    "airDate": "2005-03-29",
    "imdbRating": 8.3,
    "totalVotes": 6902,
    "directedBy": "Ken Kwapis",
    "writtenBy": "B. J. Novak"
  },
  {
    "season": 1,
    "episode": 3,
    "title": "Health Care",
    "description": "Michael leaves Dwight in charge of picking the new healthcare plan for the staff, with disastrous results ahead.",
    "airDate": "2005-04-05",
    "imdbRating": 7.7,
    "totalVotes": 5756,
    "directedBy": "Ken Whittingham",
    "writtenBy": "Paul Lieberstein"
  },
  {
    "season": 1,
    "episode": 4,
    "title": "The Alliance",
    "description": "Just for a laugh, Jim agrees to an alliance with Dwight regarding the downsizing rumors.",
    "airDate": "2005-04-12",
    "imdbRating": 8,
    "totalVotes": 5579,
    "directedBy": "Bryan Gordon",
    "writtenBy": "Michael Schur"
  },
  {
    "season": 1,
    "episode": 5,
    "title": "Basketball",
    "description": "Michael and his staff challenge the warehouse workers to a basketball game with a bet looming over both parties.",
    "airDate": "2005-04-19",
    "imdbRating": 8.4,
    "totalVotes": 6183,
    "directedBy": "Greg Daniels",
    "writtenBy": "Greg Daniels"
  },
  {
    "season": 1,
    "episode": 6,
    "title": "Hot Girl",
    "description": "Michael is just one of the many male staff who start vying for the attention of an attractive saleswoman in the office.",
    "airDate": "2005-04-26",
    "imdbRating": 7.7,
    "totalVotes": 5495,
    "directedBy": "Amy Heckerling",
    "writtenBy": "Mindy Kaling"
  }
]
```

## Get Episode by ID

Request Path - [/season/:id/episode/:id](https://officeapi.akashrajpurohit.com/season/1/episode/1)

Response -

```json
{
  "season": 1,
  "episode": 1,
  "title": "Pilot",
  "description": "The premiere episode introduces the boss and staff of the Dunder-Mifflin Paper Company in Scranton, Pennsylvania in a documentary about the workplace.",
  "airDate": "2005-03-24",
  "imdbRating": 7.4,
  "totalVotes": 7006,
  "directedBy": "Ken Kwapis",
  "writtenBy": "Ricky Gervais & Stephen Merchant and Greg Daniels"
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

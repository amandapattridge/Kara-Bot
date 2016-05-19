# Kara-Bot

Care about your project.

## Team

  - __Product Owner__: Aaron Hildebrand
  - __Scrum Master__: Rocky Murdoch
  - __Development Team Members__: Kris Stange, Amanda Pattridge

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

KaraBot connects to several APIs in order to send information to users via Slack. Some of these notifications are automatic, while others are triggered on commands from a user. First, let's cover the commands you can give KaraBot

For multi-word commands, the command does not need to appear exactly as written, but all of the command words must be used in the right order
  Command: 'weather today in San Diego, CA'
  - OK: 'How's the **weather** for **today in San Diego, CA**?'
  - NOT OK: '**Today**'s'**weather San Diego, CA**'
    - *did not use every word, words not in correct order*

Slash commands must be used exactly as written

### GitHub
**GitHub API**

- **/repos** - show all repos in your organization
- **/watch** [repo name] - KaraBot will watch the specified repo and alert you when a pull request is created, updates or merged
- **/unwatch** [repo name] - KaraBot will stop watching the specified repo

### JIRA
**JIRA API**

 - **'jira priority 1'**, **'jira priority one'**, **'jira highest priority'** or **'highest priority jira'** - KaraBot will respond with a list of all highest priority JIRA issues to which you have viewing access

### Google Calendar
**Google Calendar API**

- **'clist'** - List KaraBot's calendar functions
- **'ctoday'** - Get a list of scheduled appointments for today
- **'ctomo(\*)'** or **'ctomm(\*)'** - (responds to any message containing ctomo or ctomm) Get a list of scheduled appointments for tomorrow
- **'cdayaft'** - Get a list of scheduled appointments for the day after tomorrow
- **'cfree'** - Display free blocks of time on your calendar for today
- **'cfreetom'** - Display free blocks of time on your calendar for tomorrow
- **'cnew [start] [end] [appointment name] | [location]'** - create a new event, using military time. Minutes are optional for times, as is location
  - cnew 9:00 12 Sales Meeting | Room B
  - cnew 17 19 Call John Smith 

### Tone Analysis
**Watson API**

- **'tone'** or **'tone help'** - Lists commands for tone
- **'tone list'** or **'tone channels'** - Lists all channels available for tone analysis
- **'tone [number]'** or **'tone [name]'**' - Shows the emotional and social tone of a channel (get channel number from tone list)

### Weather
**OpenWeatherMap API**

- **'today weather in [city/zip]'** or **'today weather for [city or zip]'** - Display today's weather
- **'tomorrow weather in [city/zip]'** or **'tomorrow weather for [city or zip]'** - Display tomorrow's weather
- **'4 day in [city/zip]'** or **'4 day for [city or zip]'** - Display four day forcast

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


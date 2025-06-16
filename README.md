# Local Roblox API

A lightweight, self-hosted API for fetching Roblox user profile information, friends, and followers. This API acts as a wrapper around Roblox's public endpoints, providing a simplified interface for common operations.

## Features

- Fetch detailed user profile information by username
- Get a user's friends list with avatar thumbnails
- Get a user's followers with avatar thumbnails
- CORS enabled for easy web integration
- Simple setup and deployment

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/xtdw/local-roblox-api.git
   cd local-roblox-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
   Or on Windows, simply run:
   ```
   install.bat
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:8000`

### Available Endpoints

#### Get User Profile
```
GET /profile/:username
```

**Example:**
```
GET http://localhost:8000/profile/ROBLOX
```

#### Get User Friends
```
GET /friends/:userId
```

**Example:**
```
GET http://localhost:8000/friends/1
```

#### Get User Followers
```
GET /followers/:userId
```

**Example:**
```
GET http://localhost:8000/followers/1
```

#### Get User Following
```
GET /following/:userId
```

**Example:**
```
GET http://localhost:8000/following/1
```

## Response Format

All endpoints return JSON responses. Example success response:

```json
{
  "pD": {
    "description": "Welcome to the Roblox profile! This is where you can check out the newest items in the catalog, and get a jumpstart on exploring and building on our Imagination Platform. If you want news on updates to the Roblox platform, or great new experiences to play with friends, check out blog.roblox.com. Please note, this is an automated account. If you need to reach Roblox for any customer service needs find help at www.roblox.com/help",
    "created": "2006-02-27T21:06:40.3Z",
    "isBanned": false,
    "externalAppDisplayName": null,
    "hasVerifiedBadge": true,
    "id": 1,
    "name": "Roblox",
    "displayName": "Roblox"
  },
  "frD": {
    "count": 0
  },
  "foD": {
    "count": 15103658
  },
  "flD": {
    "count": 0
  },
  "bD": [
    {
      "id": 6,
      "name": "Homestead",
      "description": "The homestead badge is earned by having your personal place visited 100 times. People who achieve this have demonstrated their ability to build cool things that other Robloxians were interested enough in to check out. Get a jump-start on earning this reward by inviting people to come visit your place.",
      "imageUrl": "https://images.rbxcdn.com/b66bc601e2256546c5dd6188fce7a8d1.png"
    },
    {
      "id": 7,
      "name": "Bricksmith",
      "description": "The Bricksmith badge is earned by having a popular personal place. Once your place has been visited 1000 times, you will receive this award. Robloxians with Bricksmith badges are accomplished builders who were able to create a place that people wanted to explore a thousand times. They no doubt know a thing or two about putting bricks together.",
      "imageUrl": "https://images.rbxcdn.com/49f3d30f5c16a1c25ea0f97ea8ef150e.png"
    },
    {
      "id": 3,
      "name": "Combat Initiation",
      "description": "This badge was granted when a user scored 10 victories in experiences that use classic combat scripts. It was retired Summer 2015 and is no longer attainable.",
      "imageUrl": "https://images.rbxcdn.com/8d77254fc1e6d904fd3ded29dfca28cb.png"
    },
    {
      "id": 12,
      "name": "Veteran",
      "description": "This badge recognizes members who have visited Roblox for one year or more. They are stalwart community members who have stuck with us over countless releases, and have helped shape Roblox into the experience that it is today. These medalists are the true steel, the core of the Robloxian history ... and its future.",
      "imageUrl": "https://images.rbxcdn.com/b7e6cabb5a1600d813f5843f37181fa3.png"
    },
    {
      "id": 4,
      "name": "Warrior",
      "description": "This badge was granted when a user scored 100 or more victories in experiences that use classic combat scripts. It was retired Summer 2015 and is no longer attainable.",
      "imageUrl": "https://images.rbxcdn.com/0a010c31a8b482731114810590553be3.png"
    },
    {
      "id": 2,
      "name": "Friendship",
      "description": "This badge is given to members who have embraced the Roblox community and have made at least 20 friends. People who have this badge are good people to know and can probably help you out if you are having trouble.",
      "imageUrl": "https://images.rbxcdn.com/5eb20917cf530583e2641c0e1f7ba95e.png"
    },
    {
      "id": 5,
      "name": "Bloxxer",
      "description": "This badge was granted when a user scored at least 250 victories, and fewer than 250 wipeouts, in experiences that use classic combat scripts. It was retired Summer 2015 and is no longer attainable.",
      "imageUrl": "https://images.rbxcdn.com/139a7b3acfeb0b881b93a40134766048.png"
    },
    {
      "id": 8,
      "name": "Inviter",
      "description": "This badge was awarded during the Inviter Program, which ran from 2009 to 2013. It has been retired and is no longer attainable.",
      "imageUrl": "https://images.rbxcdn.com/01044aca1d917eb20bfbdc5e25af1294.png"
    },
    {
      "id": 1,
      "name": "Administrator",
      "description": "This badge identifies an account as belonging to a Roblox administrator. Only official Roblox administrators will possess this badge. If someone claims to be an admin, but does not have this badge, they are potentially trying to mislead you. If this happens, please report abuse and we will delete the imposter's account.",
      "imageUrl": "https://images.rbxcdn.com/def12ef9c8501334987a642eb11b7c91.png"
    },
    {
      "id": 18,
      "name": "Welcome To The Club",
      "description": "This badge is awarded to users who have ever belonged to the illustrious Builders Club. These people are part of a long tradition of Roblox greatness.",
      "imageUrl": "https://images.rbxcdn.com/6c2a598114231066a386fa716ac099c4.png"
    },
    {
      "id": 17,
      "name": "Official Model Maker",
      "description": "This badge is awarded to members whose creations are so awesome, Roblox endorsed them. Owners of this badge probably have great scripting and building skills.",
      "imageUrl": "https://images.rbxcdn.com/45710972c9c8d556805f8bee89389648.png"
    }
  ],
  "aU": "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/420/420/AvatarHeadshot/Png/noFilter"
}}
```

## Error Handling

Errors are returned with appropriate HTTP status codes and a JSON object containing an error message:

```json
{
  "error": "User not found or no ID returned."
}
```

## Rate Limiting

This API doesn't implement rate limiting, but please be mindful of Roblox's own rate limits when making frequent requests.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Disclaimer

This project is not affiliated with, maintained, authorized, endorsed or sponsored by Roblox Corporation or any of its affiliates. Use at your own risk.

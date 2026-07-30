# Video Tracking Plan

## Goal

Track whether a personally contacted recipient opened the demo page, started the
video, how long the video was watched, and whether it was completed.

## Personalization strategy

- Each outbound email gets a unique recipient token.
- The email link includes the token, for example:
  `https://www.aionio.eu/video-demo.html?t=RECIPIENT_TOKEN`
- The browser sends the token with every tracking event.

## Browser events

- `page_open`
- `play`
- `pause`
- `progress`
- `ended`
- `session_end`

## Suggested event payload

```json
{
  "eventType": "play",
  "recipientToken": "abc123",
  "visitorId": "uuid",
  "pageUrl": "https://www.aionio.eu/video-demo.html?t=abc123",
  "referrer": "",
  "timestamp": "2026-07-30T12:00:00.000Z",
  "currentTime": 12.4,
  "duration": 123.45,
  "watchedMs": 8400
}
```

## Suggested backend components

- Amazon SES for outbound mail
- API Gateway for event ingestion
- AWS Lambda for validation and persistence
- DynamoDB for recipient and event storage
- CloudWatch for logs and alarms

## Suggested DynamoDB model

### Table: `AionioVideoRecipients`

- `recipientToken` as partition key
- attributes: `email`, `name`, `campaignId`, `createdAt`, `status`

### Table: `AionioVideoEvents`

- `recipientToken` as partition key
- `timestamp` as sort key
- attributes: `eventType`, `visitorId`, `pageUrl`, `referrer`, `currentTime`,
  `duration`, `watchedMs`, `completionRatio`

## Measurement rules

- `page_open` means the page was loaded with a valid token.
- `play` means the viewer pressed play on the video.
- `watchedMs` is accumulated viewing time while the video is playing.
- `ended` means the video reached the end.
- A practical threshold for "viewed" can be set later, for example
  `watchedMs >= 15000` or `completionRatio >= 0.75`.

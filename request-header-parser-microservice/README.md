# Request Header Parser Microservice

## User stories:

1. Your IP address should be returned in the `ipaddress` key.
1. Your preferred language should be returned in the `language` key.
1. Your software should be returned in the `software` key.

## Example usage:

- https://request-header-parser-microservice.freecodecamp.rocks/api/whoami

### Example output:

```json
{
  "ipaddress": "159.20.14.100",
  "language": "en-US,en;q=0.5",
  "software": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"
}
```

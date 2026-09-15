const MENTION_PATTERN = /@([a-z0-9_]{3,30})/gi;

// Extracts unique, lowercased @username tokens from a comment body. Resolving
// these against real users/project membership happens in the caller — a matched
// username here isn't yet a "real" mention (see the Edge Case Decisions doc).
export function extractMentionedUsernames(body: string): string[] {
  const usernames = new Set<string>();

  for (const match of body.matchAll(MENTION_PATTERN)) {
    usernames.add(match[1]!.toLowerCase());
  }

  return [...usernames];
}

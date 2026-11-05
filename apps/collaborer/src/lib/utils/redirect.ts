// A same-origin relative path only — never follow a `redirect` param to
// another host. Guards a crafted `?redirect=https://evil.example` or
// `?redirect=//evil.example` (protocol-relative) from turning a login/register
// link into an open redirect.
export function safeRedirectPath(
  value: string | null | undefined
): string | null {
  if (!value) return null;
  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.startsWith('/\\')
  )
    return null;
  return value;
}

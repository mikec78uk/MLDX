/**
 * Next's basePath rewriting only applies to next/link, next/image, and
 * router navigation — not to arbitrary absolute-path strings (e.g. a glTF
 * URL handed to a Three.js loader, or a CSS url()). Anything that builds
 * such a path itself must prefix it manually with this.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}

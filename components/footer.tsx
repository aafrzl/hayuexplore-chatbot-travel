"use client";

import { ExternalLink } from "./external-link";

export default function Footer() {
  return (
    <footer className="px-2 text-center leading-normal text-muted-foreground">
      <div className="inline-flex items-center justify-center">
        <p className="text-sm mr-1">Made with 💜 by</p>
        <ExternalLink href="https://github.com/aafrzl">@aafrzl</ExternalLink>
      </div>
    </footer>
  );
}

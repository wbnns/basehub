#!/usr/bin/env python3
"""Emit stable RSS/Atom item identifiers for upstream snapshot diffs.

Usage: rss-snapshot.py <feed-url>

Prints one line per item: "<guid>\t<title>\t<pubDate>", sorted.
Exits non-zero on fetch/parse failure so the workflow fails loudly instead
of poisoning the snapshot with an apparent "all items removed" diff.
"""
import sys
import urllib.request
import xml.etree.ElementTree as ET

ATOM = "http://www.w3.org/2005/Atom"

def text(item, *tags):
    for tag in tags:
        el = item.find(tag)
        if el is None:
            el = item.find(f"{{{ATOM}}}{tag}")
        if el is not None and el.text:
            return el.text.strip()
    return ""

def main(url):
    req = urllib.request.Request(url, headers={"User-Agent": "basehub-upstream-sync/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    root = ET.fromstring(data)
    items = root.findall(".//item") or root.findall(f".//{{{ATOM}}}entry")
    rows = []
    for item in items:
        guid = text(item, "guid", "id", "link")
        title = text(item, "title")
        pub = text(item, "pubDate", "updated", "published")
        rows.append(f"{guid}\t{title}\t{pub}")
    for row in sorted(rows):
        print(row)

if __name__ == "__main__":
    main(sys.argv[1])

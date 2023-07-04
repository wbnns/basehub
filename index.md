---
layout: default
title: Home
nav_order: 1
description: "Get started and learn more about using Base. Base is an Ethereum Layer 2 (L2) network offering a secure, low-cost, developer-friendly way for anyone, anywhere, to build decentralized apps onchain."
permalink: /
---

# Welcome to BaseHub
{: .fs-9 }
BaseHub is a resource for learning more about and getting started with **Base**,
an Ethereum Layer 2 (L2) network.
{: .fs-6 .fw-300 }

[Get started](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Contribute to BaseHub](https://github.com/basefoss/basehub){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## What is Base?

Base is an Ethereum Layer 2 (L2) network developed and incubated inside
Coinbase. Base is aimed to be a secure, low-cost, and developer-friendly
environment for building decentralized applications (dapps). The main goal of
Base is to make onchain the default online interaction, onboarding one million
developers and one billion users into the global cryptoeconomy.

### Features of Base

+ **Secure and Low-cost**: Base offers a secure environment to build dapps,
  minimizing costs for developers and users.
+ **Developer-Friendly**: Base is EVM-equivalent and is designed to be easily
  accessible to developers, offering a straightforward platform to build dapps.
+ **Built on Optimism’s OP Stack**: Base leverages Optimism's technology to
  envision a standard, modular, rollup agnostic Superchain.
+ **No New Network Token**: Unlike other networks, Base does not plan to issue a
  new network token.

## Contributing to BaseHub

When contributing to this repository, please first discuss the change you wish
to make via GitHub Issue with other contributors of this repository before
making a change. Read more about becoming a contributor in [our GitHub
repo](FIXME).

### Code of Conduct

BaseHub is committed to fostering a welcoming community. View our [Code of
Conduct](https://github.com/basefoss/basehub/tree/main/CODE_OF_CONDUCT.md) on our
GitHub repository.

### Contributors

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"></a>
  </li>
{% endfor %}
</ul>

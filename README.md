![Portfolios](.github/assets/banner.png)

<strong>Portfolios</strong> is an open-source, self-hosted, portfolio utility for FIRST Tech Challenge teams. This enables teams to share their portfolios with the world. This project is
licensed under [GNU LGPLv3](COPYING.LESSER).

## Features

- **Easy-to-use interface**. Just one click away from the greatest portfolios
- **Accessible**. Follows the WCAG Accessibility Standards
- **High performance**. Built for static, dynamic updates are supported.
- **Free and open-source**. The code is free and open for anyone to audit and contribute to.

**Stack:**

- [**Pocketbase**](https://pocketbase.io/) for easy database support, allowing anyone to easily set up a deployment!
- [**Next.js**](https://nextjs.org/), a high-preformance scalable solution for static sites.
- [**TailwindCSS**](https://tailwindcss.com/) for easy style editing.
- [**RadixUI**](https://www.radix-ui.com/) for accessible components

## Getting started

Simply fork this repository and deploy to Vercel or your preffered hosting provider. A few great ones are listed below.

**Hosting Solutions**:

- [**Vercel**](https://vercel.app/) is easy, free, and flexible.
- [**Netlify**](https://netlify.com/) is basically the same as Vercel.
- [**Hop**](https://hop.io/) is cheap, has a generous free tier, and provides great scalable infrastructure.
- [**Railway**](https://railway.app/) is cheap, scalable, and has a great community.
- [**Fly.io**](https://fly.io/) is fast and ridiculously flexible.

**Database Solutions**:

- [**Pockethost**](https://pockethost.io/) is a free hosting provider for Pocketbase
- **Self-hosted Pocketbase** requires you to pay for a cloud service. You can run this on services like Hop, Railway, or Fly, listed above!

**Setting up Environment Variables**

Once you have your host setup, you'll notice the frontend cannot deploy without some basic environment variables. You'll need to configure these environment variables inside your web-hosting provider.

Usually they will have an interface where you can paste your environment variables. See [`env.example`](https://github.com/hivemindhq/portfolios/blob/main/.env.example) to see the schema for your environment variables.

> Please note, you will need to include all environment variables for this site to function properly.

## Contributing

Contributing is always welcome, whether you want to add a portfolio, or a feature to the web client, we will usually accept most pull-requests!

**Want to add a portfolio?**

You can add your portfolio by submitting the form [found here](https://github.com/hivemindhq/portfolios/issues/new?assignees=&labels=addition&projects=&template=add_portfolio.yml&title=Portfolios+%C2%BB+). You are required to provide all fields. Your portfolio will then be queued for review, and then will be added shortly after.

---

Built with ❤️ by Hivemind Robotics

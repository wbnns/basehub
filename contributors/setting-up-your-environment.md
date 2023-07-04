# Setting up your environment

## Build the site locally

For most previews, you will need to build the site. If you can't do this
yourself using the instructions below, please [open a pull
request](https://github.com/basefoss/basehub/compare) with your suggested
change and one of the other contributors will create a preview for you.

To build the site, you need to go through a one-time installation procedure
that takes 15 to 30 minutes.  After that you can build the site an unlimited
number of times with no extra work.

### Install The Dependencies

Before building the site, you need to install the following dependencies and
tools, which are pretty easy on any modern Linux:

#### Install binary libraries and tools

**Install RVM**

Install RVM using either the [easy instructions](https://rvm.io/) or the [more
secure instructions](https://rvm.io/rvm/security).

Read the instructions printed to your console during setup to enable the `rvm`
command in your shell.  After installation, you need to run the following
command:

	source ~/.rvm/scripts/rvm

**Install Bundle**

When you used RVM to install Ruby, it also installed the `gem` program. Use
that program to install bundle:

	gem install bundle

**Install the Ruby dependencies**

Ensure you checked out the site repository as described in [Working with
GitHub](https://github.com/basefoss/basehub/blob/main/contributors/working-with-github.md).
Then change directory to the top-level of your local repository (replace
`basehub` with the full path to your local repository clone):

	cd basehub

And install the necessary dependencies using Bundle:

	bundle install

Note that some of the dependencies can take a long time to install on some
systems, so be patient.

Once Bundle completes successfully, you can preview or build the site.

## Preview The Site

To preview the website in your local browser, make sure you're in the `basehub`
directory and run the following command:

	jekyll serve

This will compile the site and then print a message that ends like this:

	Server address: http://127.0.0.1:4000 Server running... press ctrl-c to
stop.

Visit the indicated URL in your browser to view the site.

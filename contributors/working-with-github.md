## Working with GitHub

GitHub allows you to make changes to a project using git, and later submit them
in a "pull request" so they can be reviewed and discussed. In order to use
GitHub, you need to [sign up](http://github.com/signup) and [set up
git](https://help.github.com/articles/set-up-git). You will also need to
[fork](https://help.github.com/articles/fork-a-repo/) the basehub repository
from its [GitHub page](https://github.com/basefoss/basehub.org) and clone
your GitHub repository into a local directory with the following command lines:

```
git clone (url provided by GitHub on your fork's page) basehub
cd basehub
git remote add upstream https://github.com/basefoss/basehub.org.git
```

## How to make a pull request

1. Checkout to your main branch. `git checkout main`
2. Create a new branch from the main branch. `git checkout -b (any name)`
3. Edit files and [preview](#previewing) the result.
4. Track changes in files. `git add -A`
5. Commit your changes. `git commit -m '(short description for your change)'`
6. Push your branch on your GitHub repository. `git push origin (name of your
   branch)`
7. Click on your branch on GitHub and click the **Compare / pull request**
   button to send a pull request.

When submitting a pull request, please take required time to discuss your
changes and adapt your work. It is generally a good practice to split unrelated
changes into separate branches and pull requests.

### How to make additional changes in a pull request

You simply need to push additional commits on the appropriate branch of your
GitHub repository. That's basically the same steps as above, except you don't
need to re-create the branch and the pull request.

## How to reset and update your main branch with latest upstream changes

1. Fetch upstream changes. `git fetch upstream`
2. Checkout to your main branch. `git checkout main`
3. Replace your main branch by the upstream main branch. `git reset --hard
   upstream/main`
4. Replace your main branch on GitHub. `git push origin main -f`


# Contributing

We'd love your help making `protobuf-es` better!

If you'd like to add new exported APIs, please [open an issue][open-issue]
describing your proposal &mdash; discussing API changes ahead of time makes
pull request review much smoother. In your issue, pull request, and any other
communications, please remember to treat your fellow contributors with
respect!

Note that you'll need to sign [Buf's Contributor License Agreement][cla]
before we can accept any of your contributions. If necessary, a bot will remind
you to accept the CLA when you open your pull request.

## Setup

[Fork][fork], then clone the repository:

```
git clone git@github.com:your_github_username/protobuf-es.git
cd protobuf-es
git remote add upstream https://github.com/bufbuild/protobuf-es.git
git fetch upstream
```

Install dependencies (you'll need Node.js in the version specified in `.nvmrc`,
and `npm` in the version specified in `package.json`):

```bash
npm ci
```

Make sure that the tests and the linters pass:

```bash
npx turbo run test lint
```

We're using `turborepo` to run tasks. If you haven't used it yet, take a look at
[filtering and package scoping](https://turbo.build/repo/docs/crafting-your-repository/running-tasks).

## Making Changes

Start by creating a new branch for your changes:

```
git checkout main
git fetch upstream
git rebase upstream/main
git checkout -b cool_new_feature
```

Make your changes, then ensure that tests and linters still pass.
When you're satisfied with your changes, push them to your fork.

```
git commit -a
git push origin cool_new_feature
```

Then use the GitHub UI to open a pull request.

At this point, you're waiting on us to review your changes. We _try_ to respond
to issues and pull requests within a few business days, and we may suggest some
improvements or alternatives. Once your changes are approved, one of the
project maintainers will merge them.

We're much more likely to approve your changes if you:

- Add tests for new functionality.
- Write a [good commit message][commit-message].
- Maintain backward compatibility.

[fork]: https://github.com/bufbuild/protobuf-es/fork
[open-issue]: https://github.com/bufbuild/protobuf-es/issues/new
[cla]: https://cla-assistant.io/bufbuild/protobuf-es
[commit-message]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

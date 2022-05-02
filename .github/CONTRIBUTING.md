Contributing
============

We'd love your help making Protobuf-ES better!

If you'd like to add new exported APIs, please [open an issue][open-issue]
describing your proposal &mdash; discussing API changes ahead of time makes
pull request review much smoother. In your issue, pull request, and any other
communications, please remember to treat your fellow contributors with
respect!


## Setup

[Fork][fork], then clone the repository:

```
git clone git@github.com:your_github_username/connect-web.git
cd connect-web
git remote add upstream https://github.com/bufbuild/connect-web.git
git fetch upstream
```

Make sure that the tests and the linters pass (you'll need `node`, `bazel`, 
`go`, `buf`, and `bash` installed):

```
make 
```



## Making Changes

Start by creating a new branch for your changes:

```
cd $GOPATH/src/github.com/bufbuild/connect
git checkout main
git fetch upstream
git rebase upstream/main
git checkout -b cool_new_feature
```

Make your changes, then ensure that `make` still passes. 

```
git commit -a
git push origin cool_new_feature
```

Then use the GitHub UI to open a pull request.

At this point, you're waiting on us to review your changes. We *try* to respond
to issues and pull requests within a few business days, and we may suggest some
improvements or alternatives. Once your changes are approved, one of the
project maintainers will merge them.

We're much more likely to approve your changes if you:

* Add tests for new functionality.
* Write a [good commit message][commit-message].
* Maintain backward compatibility.

[fork]: https://github.com/bufbuild/connect-web/fork
[open-issue]: https://github.com/bufbuild/connect-web/issues/new
[cla]: TODO
[commit-message]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

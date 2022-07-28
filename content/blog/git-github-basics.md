+++
title = "Git/GitHub basics"
date = 2022-07-28
+++

- [What is Git?](#what-is-git)
- [What is GitHub](#what-is-github)
- [Definitions](#definitions)
- [Using Git and GitHub](#using-git-and-github)
  - [Cloning](#cloning)
  - [Committing](#committing)
  - [Pushing to GitHub](#pushing-to-github)
  - [Branching](#branching)
  - [Creating a PR](#creating-a-pr)
  - [Reviewing a PR](#reviewing-a-pr)
  - [Merging](#merging)
  - [Deleting local branches](#deleting-local-branches)

## What is Git?
Git is an open-source version control software widely used in software development to collaborate and track changes to a set of files. The latest version of Git can be downloaded [here.](https://git-scm.com/)

## What is [GitHub](https://github.com/)?
GitHub is a web service that allows you to store a remote repository (a set of files) on their servers. This means that after you make changes to files on your local machine, you can then “push” those changes to the remote repository on GitHub. This allows you and others to access these changes on separate computers and collaborate on your repository.

## Definitions
__Repository__ - A GitHub repository/repo is a set of files and folders that make up your project. These files are typically required to build and contribute to your project on another computer. A repo will usually contain a README markdown file that describes the project clearly.

__Branch__ - A branch is a way to work with a different version of your repo whilst keeping an existing version active. The default branch is called the master/main branch. Creating a new branch from the main branch will result in a copy of the main branch. Changes to the new branch will not be reflected in the main branch until a merge has occurred.

<p align="center">
  <img src="/images/git-github-basics/git-branches-merge.png" alt="Git Branches" width="500">
</p>

<p align="center"><a href="https://www.nobledesktop.com/learn/git/git-branches">Image Source</a></p>

This image illustrates how multiple people can collaborate on the same project by using separate branches. Each circle is a commit. Lines moving from master outwards are branches, and lines moving towards master are merges.

__Commits__ - Every change to your repo is called a commit. Each commit has a small description of the changes made.

__Pull Requests__ - Pull requests are made to pull the changes made in one branch into another. This means that someone working on a branch can create a PR (pull request) to merge into the main branch whilst another person working on a separate branch continues to work until they create a PR. If a PR has no conflicts, the PR can be merged.

## Using Git and GitHub

### Basic setup
Install [Git](https://git-scm.com/) and make a [GitHub](https://github.com/) account.
Create a new repo on GitHub by clicking on the plus dropdown at the top right.

<img src="/images/git-github-basics/new-repo.png" alt="New Repo">

### Cloning 
To download/clone the repo to your computer, click on the green code button and copy the HTTPS link to your repo. Now in the terminal of your choice or the git bash terminal, enter:

<code>
$ git clone &lt;insert your HTTPS repo link here&gt;

</code>

### Committing
As mentioned earlier, git keeps track of changes made to your repo when you make commits to your repo. To make a commit you must first add the files that you have changed. You can view the changes made to the repo by using:

<code>
$ git status

</code>

After identifying the files you want to commit, use:

<code>
$ git add &lt;name of file&gt;

</code>

If you need to add multiple files, you can simply name those files one after the other like:

<code>
$ git add &lt;name of file 1&gt; &lt;name of file 2&gt; &lt;etc&gt;

</code>

If you simply want to commit all changes, you can use:

<code>
$ git add .

</code>

Now that your files have been added, you can commit our changes using (make sure to include the quotation marks):

<code>
$ git commit -m “&lt;insert description of changes made here&gt;"

</code>

### Pushing to GitHub
Now that you have made your first commit, you can upload our changes to GitHub by making use of the git push command:

<code>
$ git push

</code>

At this point, you can navigate to your GitHub repository to see the changes you have made alongside the commit and its description.

### Branching
Although the above method of pushing to the main branch works fine when you are the only person working on a repo, doing the same with a team will quickly become problematic. This is where branching comes in handy. 

Before branching from any existing branch, you must ensure that our local repo has the latest changes downloaded. You can do this with:

<code>
$ git fetch

</code>

To create a new branch, you can now use:

<code>
$ git checkout -b &lt;insert name of new branch&gt;

</code>

Now that our new branch has been created and you have checked out to said branch, you can begin making changes. Once you have committed these new changes and are ready to push to GitHub use:

<code>
$ git push origin &lt;insert name of branch&gt;

</code>

At this point, if you navigate to your repo on GitHub, you should see a dropdown displaying the various active branches. Selecting your new branch will display your recent commit whilst the main branch will not.

<p align="center">
  <img src="/images/git-github-basics/2-branches.png" alt="Two Branches">
</p>

### Creating a PR
You should also see a “compare & pull request” button in the top area of the screen. Clicking this button will allow you to enter a PR name and description. You can also change which branch you want to merge into, and assign people to review the PR.

### Reviewing a PR
As a reviewer, your job is to ensure that the feature implemented in the PR works as intended and that the code is optimised and tidy. First, fetch the remote repo using:

<code>
$ git fetch

</code>

Then checkout to the desired branch using:

<code>
$ git checkout &lt;insert branch name&gt;

</code>

Now that you have the branch you want to review on your local system, you can test the implementation of your team member’s code. Once you have reviewed the code, you can either request changes or approve the PR.

### Merging
Ideally, you would want to have your PR approved by at least two people, but If your PR has no conflicts, you have the option of merging via GitHub by clicking on the green merge button. After merging, you can also delete the remote branch if you do not plan on using it again.

<p align="center">
  <img src="/images/git-github-basics/branch-no-conflicts.png" alt="Branch no conflicts">
</p>

### Deleting local branches
Once you have finished reviewing or have merged your changes, you can delete your local branch. First switch back to the main branch using:

<code>
$ git checkout main

</code>

Then delete the now merged feature branch:

<code>
$ git branch -D &lt;name of merged branch&gt;

</code>

Thats the general gist of Git/GitHub. There are more commands and features, but this post covers the most common commands.
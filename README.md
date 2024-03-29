# Atelier

## Git Feature Workflow
  * ### Start by switching to the main branch, fetch the latest commit, merge the changes into the local branch
    Run `git checkout main` then run <br>A) `git fetch origin` and `git reset --hard origin/main` OR<br> B) `git pull`
  * #### 1) starting work on a new widget
    Run `git checkout -b new-feature`.<br>Including the `-b` flag tells Git to create the branch if it doesn’t already exist.
  * #### 2) After pulling changes from origin/main
    Run `git checkout new-feature` and then `git merge main`. This merges the changes pulled from main into the feature branch (and preserves the full commit history in the log).
  * ### Update, add, and commit changes, as necessary
    Run `git status`,<br>
    `git add <changed-file>`,<br>
    `git commit -m "YOUR COMMIT MESSAGE"`
  * ### Push the local commits to the remote of your feature branch
    Run `git push -u origin new-feature`.<br>Including the `-u` flag adds it as a remote tracking branch. After setting up the tracking branch, `git push` automatically pushes the new-feature to the central repository.
  * ### Make pull request (with detail summary of changes made) to merge to main branch on GitHub
  * ### Move issue ticket to in review column and tag team to request review
  * ### Team mate performs code review asynchronously
  * ### Resolve feedback from code review
  * ### Merge your pull request

## Code Reviews
  * ### Run the changes you are reviewing on your local server
    Run `git switch <feature-branch-to-review>`. This creates and switches to a local version of the remote branch you are attempting to run and tracks its remote. Then run `git pull` to pull in the changes to that branch to your local branch.
  * ### Provide feedback
    Provide feedback on the code you reviewed and merge or leave the pull request open, as necessary.

# Atelier

## Git Feature Workflow
  * ### Start by switching to the main branch, fetch the latest commit, merge the changes into the local branch
      Run
      `git checkout main`,
      `git fetch origin`,
      `git reset --hard origin/main` OR USE `git pull`
  * ### Create a new-branch new-feature from origin/main for each feature or issue you work on
      Run `git checkout -b new-feature`. Including the -b flag tells Git to create the branch if it doesn’t already exist.
  * ### Update, add, and commit changes, as necessary
      Run `git status`,
      `git add <changed-file>`,
      `git commit -m "YOUR COMMIT MESSAGE"`
  * ### Push the local commits to the remote of your feature branch
      Run `git push -u origin new-feature`. Including the -u flag adds it as a remote tracking branch. After setting up the tracking branch, git push  automatically pushes the new-feature to the central repository.
  * ### Make pull request (with detail summary of changes made) to merge to main branch on GitHub
  * ### Move issue ticket to in review column and tag team to request review
  * ### Team mate performs code review asynchronously
  * ### Resolve feedback from code review
  * ### Merge your pull request

 * ### btest comment

 * ### ctest comment

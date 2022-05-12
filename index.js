const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);
    const context = github.context;

    const issues = octokit.rest.issues.listForRepo({
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    const pulls = octokit.rest.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    core.setOutput('pulls', pulls);
    core.setOutput('issues', issues);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

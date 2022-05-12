const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);
    const context = github.context;

    const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    // console.log(issues[0]);
    // console.log(issues[0].state);
    // console.log(typeof issues[0].state );
    // console.log(issues[0].state == 'open');
    // console.log(issues[0].state == "open");

    const issue_stats = {
      open: 0,
      closed: 0,
    }

    // const pull_stats = {
    //   open: 0,
    //   closed: 0,
    //   merged:0,
    // }

    for(const issue of issues){
      console.log(issue.html_url);
      console.log(issue.state);
      if(issue.state == 'open'){
        issue_stats.open ++;
      }
      else{
        issue_stats.closed ++;
      }
    }
    
    const pulls = await octokit.paginate(octokit.rest.pulls.list, {
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    for(const pull of pulls){
      console.log(pull.html_url);
      console.log(pull.state);
    }

    core.setOutput('pulls', 0);
    core.setOutput('issues', issue_stats);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

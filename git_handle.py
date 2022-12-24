# automatically pushes all files to github auto

from git import Repo

git_path = "/home/milk/personalBot/Personal-Bot/"

def git_push(commit_message):
    try:
        repo = Repo(git_path)
        repo.git.add(all=True)
        repo.index.commit(commit_message)
        origin = repo.remote(name='origin')
        origin.push()
    except:
        print("Some error occured while pushing the code")

git_push("A day has passed, auto pushed data for backup")

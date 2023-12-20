"""This script will save the current season data into a JSON file and update
it per season. Kind of like a snapshot for the season"""

import json
from datetime import datetime


def main():
    current_year = datetime.now().year
    season_string = f"season_{current_year}"

    # users_file_name = "../../userData.json"
    users_file_name = "/home/milk/personalBot/Personal-Bot/userData.json"
    # save_season_json = "./save-season.json"
    save_season_json = "/home/milk/personalBot/Personal-Bot/scheduled/seasonal/save-season.json"

    # opens user data
    with open(users_file_name, "r") as file:
        users = json.load(file)

    # turns user data into dictionary
    season_users = {}
    for user in users:
        if user.get("seasonDate"):
            datetime_object = datetime.strptime(
                user.get("seasonDate"), "%Y-%m-%dT%H:%M:%S.%fZ")
            year = datetime_object.year
            if year == current_year:
                season_users[user.get("userID")] = {
                    "userName": user.get("userName"),
                    f"{season_string}": [[user.get("seasonDate"), user.get("seasonTime")]],
                }

    # opens old save file of seasons
    with open(save_season_json, "r") as file:
        old_users = json.load(file)

    # appends or adds new entry to old save file
    for user_id, user in season_users.items():
        if user_id in old_users:
            old_user = old_users.get(user_id)

            if old_user.get(season_string):
                if user.get(season_string)[0] not in old_user.get("season"):
                    old_user.get(season_string).append(user.get("season")[0])
            else:
                old_user[season_string] = user.get(season_string)
        else:
            old_users[user_id] = user

    # write new to old save file
    with open(save_season_json, "w") as file:
        file.write(json.dumps(old_users, indent=2))


if __name__ == "__main__":
    main()

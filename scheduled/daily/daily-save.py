import json
from datetime import datetime


def main():
    today = datetime.today().strftime("%Y-%m-%d")

    # get users data
    users_file_name = "../../userData.json"
    with open(users_file_name, "r") as file:
        users = json.load(file)

    for user in users:
        id = user.get("userID")
        name = user.get("userName")
        date_string = user.get("dayTrackerDay")
        time = user.get("dayTrackerTime")

        date = datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S.%fZ")
        date = date.strftime("%Y-%m-%d")

        if date == today:
            write_path_name = f"./members/{name}_{id}_days.txt"
            with open(write_path_name, "a") as file:
                file.write(f"{date},{time}")
    print("Tracking successful!")


if __name__ == "__main__":
    main()

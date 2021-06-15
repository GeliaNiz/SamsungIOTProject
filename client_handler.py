import configparser
import random
import string


def generate_id():
    return ''.join([random.choice(string.ascii_letters
     + string.digits) for n in range(8)])


config = configparser.ConfigParser()


def init_clients(ip):
    config.read("Settings.txt")
    if not config.has_section("Connections"):
        config.add_section("Connections")
    else:
        if config.has_option("Connections",ip):
            return None
    id = generate_id()
    config.set("Connections",ip,id)
    with open("Settings.txt","w") as config_file:
        config.write(config_file)


init_clients("192.168.35.163")
init_clients("234.67.03.234")
init_clients("234.67.03.234")
init_clients("234.67.678.234")




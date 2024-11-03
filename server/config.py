
class config(object):
    DEBUG = False
    TESTING = False
    SCHEDULER_API_ENABLED = True

class development_config(config):
    DEBUG = True

class testing_config(config):
    TESTING = True
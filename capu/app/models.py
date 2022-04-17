from django.db.models import (
    CASCADE,
    CharField,
    DateTimeField,
    ForeignKey,
    IntegerField,
    Model,
)


# Model:
# - Settings
#     - featured_posts
#     - recently_completed_duration
# - Post
#     - id
#     - title
#     - subtitle
#     - body
# - Event
#     - post
#     - departure
#     - status
#     - attributes
#     - event_close
# - EventClose
#     - body
#     - attributes
# - EventAttribute
#     - name
#     - value


class Post(Model):
    pass

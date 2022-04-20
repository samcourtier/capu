from django.db.models import (
    CASCADE,
    CharField,
    DateTimeField,
    Deferrable,
    ForeignKey,
    IntegerField,
    Model,
    TextField,
    UniqueConstraint,
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
    title = CharField("Title", max_length=256)
    subtitle = CharField("Subtitle", max_length=256, blank=True, default="")
    body = TextField("Body")
    display_priority = IntegerField(
        default=0, help_text="Set this to 0 to hide the post."
    )


class PostAttribute(Model):
    post = ForeignKey(Post, on_delete=CASCADE)
    name = CharField("Name", max_length=64)
    value = CharField("Value", max_length=512)
    display_priority = IntegerField(
        default=0, help_text="Set this to 0 to hide the attribute."
    )

    class Meta:
        constraints = [
            UniqueConstraint(
                name="unique_post_attribute",
                fields=["post", "name"],
                deferrable=Deferrable.DEFERRED,
            )
        ]

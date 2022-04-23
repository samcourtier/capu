from django.db.models import (
    CASCADE,
    BigAutoField,
    CharField,
    ForeignKey,
    IntegerField,
    Model,
    TextField,
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
    id = BigAutoField("ID", db_column="post_id", primary_key=True)
    title = CharField("Title", max_length=256)
    subtitle = CharField("Subtitle", max_length=256, blank=True, default="")
    body = TextField("Body")
    display_priority = IntegerField(
        default=0, help_text="Set this to 0 to hide the post."
    )

    class Meta:
        managed = False
        db_table = "posts"


class PostAttribute(Model):
    id = BigAutoField("ID", db_column="post_attribute_id", primary_key=True)
    post = ForeignKey(
        Post, related_name="attributes", db_column="post_id", on_delete=CASCADE
    )
    name = CharField("Name", max_length=64)
    value = CharField("Value", max_length=512)
    display_priority = IntegerField(
        default=0, help_text="Set this to 0 to hide the attribute."
    )

    class Meta:
        managed = False
        db_table = "post_attributes"
        unique_together = (("post", "name"),)

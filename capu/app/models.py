from django.db.models import (
    CASCADE,
    SET_NULL,
    TextChoices,
    DateTimeField,
    BigAutoField,
    CharField,
    ForeignKey,
    IntegerField,
    Model,
    TextField,
    FloatField,
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

    def __str__(self) -> str:
        return f"{self.id} - {self.title}"

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

    def __str__(self) -> str:
        return f"{self.name}"

    class Meta:
        managed = False
        db_table = "post_attributes"
        unique_together = (("post", "name"),)


class ClimbingDifficulties(TextChoices):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    LEG_MAULING = "Leg Mauling"


class PlannedRide(Model):
    id = BigAutoField("ID", db_column="planned_ride_id", primary_key=True)
    post = ForeignKey(
        Post,
        related_name="planned_rides",
        db_column="post_id",
        on_delete=SET_NULL,
        null=True,
    )
    title = CharField("Title", max_length=256)
    subtitle = CharField("Subtitle", max_length=256, blank=True, default="")
    ride_group = CharField("Group", max_length=64, blank=True, default="")
    route_title = CharField("Route Title", max_length=256, blank=True, default="")
    route_description = TextField("Route Description", blank=True, default="")
    start_datetime = DateTimeField("Start Time")
    start_location = CharField("Start Location", max_length=256)
    meetup_location = CharField(
        "After-ride Meetup Location", max_length=256, blank=True, default=""
    )
    expected_distance = FloatField(
        "Expected Distance (ft)", null=True, blank=True, default=None
    )
    climbing_difficulty = CharField(
        "Climbing Difficulty",
        max_length=16,
        choices=ClimbingDifficulties.choices,
        blank=True,
        default="",
    )
    comments = TextField("Comments", blank=True, default="")

    def __str__(self) -> str:
        return f"{self.id} - {self.title} ({self.start_datetime} UTC)"

    class Meta:
        managed = False
        db_table = "planned_rides"


class PlannedRideAttribute(Model):
    id = BigAutoField("ID", db_column="planned_ride_attribute_id", primary_key=True)
    planned_ride = ForeignKey(
        PlannedRide,
        related_name="attributes",
        db_column="planned_ride_id",
        on_delete=CASCADE,
    )
    name = CharField("Name", max_length=64)
    value = CharField("Value", max_length=512)
    display_priority = IntegerField(
        default=0, help_text="Set this to 0 to hide the attribute."
    )

    def __str__(self) -> str:
        return f"{self.name}"

    class Meta:
        managed = False
        db_table = "planned_ride_attributes"
        unique_together = (("planned_ride", "name"),)

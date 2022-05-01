from django.contrib.admin import ModelAdmin, TabularInline, register, StackedInline

from .models import PlannedRide, PlannedRideAttribute, Post, PostAttribute


class PostAttributeInline(TabularInline):
    model = PostAttribute
    extra = 1


class PlannedRideInline(StackedInline):
    model = PlannedRide
    extra = 1


@register(Post)
class PostAdmin(ModelAdmin):
    list_display = ("title", "subtitle", "display_priority")
    inlines = [PostAttributeInline, PlannedRideInline]

    def get_changeform_initial_data(self, request):
        top_post = Post.objects.order_by("display_priority").last()
        priority = top_post.display_priority + 1 if top_post else 1
        return {"display_priority": priority}


class PlannedRideAttributeInline(TabularInline):
    model = PlannedRideAttribute


@register(PlannedRide)
class PlannedRideAdmin(ModelAdmin):
    raw_id_fields = ["post"]
    list_display = ("title", "start_datetime")
    inlines = [PlannedRideAttributeInline]

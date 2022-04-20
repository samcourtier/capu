from django.contrib.admin import ModelAdmin, TabularInline, register

from .models import Post, PostAttribute


class PostAttributeInline(TabularInline):
    model = PostAttribute


@register(Post)
class PostAdmin(ModelAdmin):
    list_display = ("title", "subtitle", "display_priority")
    inlines = [PostAttributeInline]

    def get_changeform_initial_data(self, request):
        top_post = Post.objects.order_by("display_priority").last()
        priority = top_post.display_priority + 1 if top_post else 1
        return {"display_priority": priority}

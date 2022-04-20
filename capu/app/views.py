from django.db.models import Prefetch
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from .models import Post, PostAttribute


def index(request: HttpRequest) -> HttpResponse:
    posts = (
        Post.objects.exclude(display_priority=0)
        .order_by("-display_priority")
        .prefetch_related(
            Prefetch(
                "postattribute_set",
                queryset=PostAttribute.objects.exclude(display_priority=0).order_by(
                    "-display_priority",
                ),
            ),
        )
        .all()
    )
    return render(
        request,
        "app/index.html",
        {"posts": posts},
    )

from django.db import connection
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET

from .models import PageVisit


@require_GET
def home(request):
    return render(request, 'api/home.html')


@require_GET
def site_stats(request):
    PageVisit.objects.create()

    db_now = None
    with connection.cursor() as cursor:
        cursor.execute("SELECT now()")
        db_now = cursor.fetchone()[0]

    count = PageVisit.objects.count()

    return JsonResponse({
        "visit_count": count,
        "database_datetime": db_now.isoformat(),
    })
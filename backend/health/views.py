from django.http import JsonResponse


def health_check(request):
    return JsonResponse({
        "status": "ok",
        "items": [
            "Configurar Docker",
            "Automatizar CI",
            "Publicar no GHCR"
        ]
    })

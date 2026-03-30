<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Course;
use App\Models\CourseArea;
use App\Models\GalleryItem;
use App\Models\NewsItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ApiController extends Controller
{
    public function contactosStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'assunto' => ['required', 'string', 'max:255'],
            'mensagem' => ['required', 'string', 'max:5000'],
        ]);

        ContactMessage::create($data);

        return response()->json(['ok' => true, 'mensagem' => 'Mensagem enviada com sucesso.']);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        if ($credentials['email'] !== env('ADMIN_EMAIL', 'admin@ipikk.ao') || $credentials['password'] !== env('ADMIN_PASSWORD', 'admin123')) {
            return response()->json(['ok' => false, 'mensagem' => 'Credenciais inválidas.'], 422);
        }

        $request->session()->put('admin_auth', true);
        return response()->json(['ok' => true, 'redirect' => '/admin/pages/admin-dashboard.html']);
    }

    public function noticiasPublicas(): JsonResponse
    {
        $items = NewsItem::query()->where('estado', 'publicada')->orderByDesc('data_publicacao')->get();
        return response()->json($items->map(fn (NewsItem $item) => $this->newsResource($item)));
    }

    public function noticiasAdmin(): JsonResponse
    {
        return response()->json(NewsItem::query()->orderByDesc('created_at')->get()->map(fn (NewsItem $item) => $this->newsResource($item, true)));
    }

    public function noticiaStore(Request $request): JsonResponse
    {
        $data = $this->validateNews($request);
        $news = NewsItem::create($data);
        return response()->json(['ok' => true, 'item' => $this->newsResource($news, true)]);
    }

    public function noticiaUpdate(Request $request, NewsItem $newsItem): JsonResponse
    {
        $data = $this->validateNews($request, false);
        $newsItem->update($data);
        return response()->json(['ok' => true, 'item' => $this->newsResource($newsItem->fresh(), true)]);
    }

    public function noticiaDestroy(NewsItem $newsItem): JsonResponse
    {
        $newsItem->delete();
        return response()->json(['ok' => true]);
    }

    public function areasList(): JsonResponse
    {
        return response()->json(CourseArea::query()->withCount('cursos')->orderBy('nome')->get());
    }

    public function areaStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'cor' => ['nullable', 'string', 'max:30'],
            'icone' => ['nullable', 'string', 'max:100'],
            'classe_botao' => ['nullable', 'string', 'max:100'],
            'slug' => ['nullable', 'string', 'max:255'],
        ]);
        $data['slug'] = Str::slug($data['slug'] ?? $data['nome']);
        $area = CourseArea::create($data);
        return response()->json(['ok' => true, 'item' => $area]);
    }

    public function areaUpdate(Request $request, CourseArea $courseArea): JsonResponse
    {
        $data = $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'cor' => ['nullable', 'string', 'max:30'],
            'icone' => ['nullable', 'string', 'max:100'],
            'classe_botao' => ['nullable', 'string', 'max:100'],
            'slug' => ['nullable', 'string', 'max:255'],
        ]);
        $data['slug'] = Str::slug($data['slug'] ?? $data['nome']);
        $courseArea->update($data);
        return response()->json(['ok' => true, 'item' => $courseArea->fresh()]);
    }

    public function areaDestroy(CourseArea $courseArea): JsonResponse
    {
        $courseArea->delete();
        return response()->json(['ok' => true]);
    }

    public function cursosPublicos(): JsonResponse
    {
        return response()->json(Course::query()->with('area')->where('estado', 'ativo')->orderBy('nome')->get());
    }

    public function cursosAdmin(): JsonResponse
    {
        return response()->json(Course::query()->with('area')->orderBy('nome')->get());
    }

    public function cursoStore(Request $request): JsonResponse
    {
        $data = $this->validateCurso($request);
        $course = Course::create($data);
        return response()->json(['ok' => true, 'item' => $course->load('area')]);
    }

    public function cursoUpdate(Request $request, Course $course): JsonResponse
    {
        $data = $this->validateCurso($request, false);
        $course->update($data);
        return response()->json(['ok' => true, 'item' => $course->fresh()->load('area')]);
    }

    public function cursoDestroy(Course $course): JsonResponse
    {
        $course->delete();
        return response()->json(['ok' => true]);
    }

    public function galeriaPublica(): JsonResponse
    {
        $items = GalleryItem::query()
            ->where('estado', 'publicado')
            ->where('tipo', 'imagem')
            ->orderBy('ordem')
            ->get();
        return response()->json($items);
    }

    public function galeriaAdmin(): JsonResponse
    {
        return response()->json(GalleryItem::query()->orderBy('ordem')->get());
    }

    public function galeriaStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'tipo' => ['required', 'in:imagem,video'],
            'categoria' => ['required', 'string', 'max:100'],
            'legenda' => ['nullable', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:2048'],
            'ordem' => ['nullable', 'integer', 'min:1'],
            'estado' => ['nullable', 'in:publicado,rascunho'],
        ]);
        $item = GalleryItem::create($data);
        return response()->json(['ok' => true, 'item' => $item]);
    }

    public function galeriaUpdate(Request $request, GalleryItem $galleryItem): JsonResponse
    {
        $data = $request->validate([
            'tipo' => ['required', 'in:imagem,video'],
            'categoria' => ['required', 'string', 'max:100'],
            'legenda' => ['nullable', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:2048'],
            'ordem' => ['nullable', 'integer', 'min:1'],
            'estado' => ['nullable', 'in:publicado,rascunho'],
        ]);
        $galleryItem->update($data);
        return response()->json(['ok' => true, 'item' => $galleryItem->fresh()]);
    }

    public function galeriaDestroy(GalleryItem $galleryItem): JsonResponse
    {
        $galleryItem->delete();
        return response()->json(['ok' => true]);
    }

    public function adminResumo(): JsonResponse
    {
        return response()->json([
            'mensagens' => ContactMessage::count(),
            'noticias' => NewsItem::count(),
            'cursos' => Course::count(),
            'areas' => CourseArea::count(),
            'galeria' => GalleryItem::count(),
        ]);
    }

    private function validateNews(Request $request, bool $required = true): array
    {
        $base = $required ? ['required'] : ['sometimes'];

        $data = $request->validate([
            'categoria' => [...$base, 'string', 'max:80'],
            'titulo' => [...$base, 'string', 'max:255'],
            'resumo' => ['nullable', 'string', 'max:600'],
            'descricao' => ['nullable', 'string'],
            'tipo' => ['nullable', 'in:imagem,video'],
            'imagem' => ['nullable', 'string', 'max:2048'],
            'video_url' => ['nullable', 'string', 'max:2048'],
            'alt' => ['nullable', 'string', 'max:255'],
            'data_publicacao' => ['nullable', 'date'],
            'autor' => ['nullable', 'string', 'max:255'],
            'visualizacoes' => ['nullable', 'integer', 'min:0'],
            'tags' => ['nullable', 'array'],
            'estado' => ['nullable', 'in:publicada,rascunho,arquivada'],
            'destaque_principal' => ['nullable', 'boolean'],
        ]);

        $media = ($data['tipo'] ?? 'imagem') === 'video' ? ($data['video_url'] ?? null) : ($data['imagem'] ?? null);
        $data['midia'] = $media;

        return $data;
    }

    private function newsResource(NewsItem $item, bool $admin = false): array
    {
        return [
            'id' => $item->id,
            'categoria' => $item->categoria,
            'titulo' => $item->titulo,
            'resumo' => $item->resumo,
            'descricao' => $item->descricao,
            'conteudo' => $item->descricao,
            'midia' => $item->midia,
            'tipo' => $item->tipo,
            'tipoMidia' => $item->tipo,
            'imagem' => $item->imagem ?? $item->midia,
            'videoUrl' => $item->video_url,
            'data' => optional($item->data_publicacao)->format('Y-m-d') ?? optional($item->created_at)->format('Y-m-d'),
            'autor' => $item->autor,
            'visualizacoes' => $item->visualizacoes,
            'tags' => is_array($item->tags) ? $item->tags : array_filter(array_map('trim', explode(',', (string) $item->tags))),
            'estado' => $item->estado ?? 'publicada',
            'destaquePrincipal' => (bool) $item->destaque_principal,
            'alt' => $item->alt,
            'dataFormatada' => optional($item->data_publicacao)->format('d/m/Y') ?? optional($item->created_at)->format('d/m/Y'),
            'visualizacoesFormatadas' => number_format((int) $item->visualizacoes, 0, ',', '.'),
            'publicada' => ($item->estado ?? 'publicada') === 'publicada',
            'admin' => $admin,
        ];
    }

    private function validateCurso(Request $request, bool $required = true): array
    {
        $base = $required ? ['required'] : ['sometimes'];

        $data = $request->validate([
            'area_id' => ['nullable', 'integer', 'exists:course_areas,id'],
            'nome' => [...$base, 'string', 'max:255'],
            'duracao' => ['nullable', 'string', 'max:100'],
            'vagas' => ['nullable', 'integer', 'min:0'],
            'estado' => ['nullable', 'in:ativo,pausado,arquivado'],
            'descricao_curta' => ['nullable', 'string', 'max:500'],
            'descricao_longa' => ['nullable', 'string'],
            'icone' => ['nullable', 'string', 'max:120'],
            'destaque' => ['nullable', 'boolean'],
            'objetivo' => ['nullable', 'string'],
            'competencias' => ['nullable', 'string'],
            'certificacao' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'meta' => ['nullable', 'array'],
        ]);

        $data['slug'] = Str::slug($data['slug'] ?? $data['nome'] ?? Str::random(8));
        return $data;
    }
}

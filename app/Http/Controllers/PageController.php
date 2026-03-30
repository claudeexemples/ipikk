<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class PageController extends Controller
{
    public function publicPage(string $page): Response
    {
        return $this->renderHtml(base_path("public/pages/{$page}.html"));
    }

    public function adminPage(string $page): Response
    {
        return $this->renderHtml(base_path("admin/pages/{$page}.html"));
    }

    private function renderHtml(string $path): Response
    {
        abort_unless(is_file($path), 404);

        $html = file_get_contents($path);

        return response($html)
            ->header('Content-Type', 'text/html; charset=UTF-8');
    }
}

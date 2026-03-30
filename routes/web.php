<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect('/pages/index.html'));

Route::get('/pages/{page}.html', [PageController::class, 'publicPage']);
Route::get('/admin/pages/{page}.html', [PageController::class, 'adminPage']);

Route::post('/api/contactos', [ApiController::class, 'contactosStore']);
Route::post('/api/login', [ApiController::class, 'login']);

Route::get('/api/noticias', [ApiController::class, 'noticiasPublicas']);
Route::get('/api/public/noticias', [ApiController::class, 'noticiasPublicas']);
Route::get('/api/public/cursos', [ApiController::class, 'cursosPublicos']);
Route::get('/api/public/galeria', [ApiController::class, 'galeriaPublica']);

Route::get('/api/admin/resumo', [ApiController::class, 'adminResumo']);

Route::get('/api/admin/noticias', [ApiController::class, 'noticiasAdmin']);
Route::post('/api/admin/noticias', [ApiController::class, 'noticiaStore']);
Route::put('/api/admin/noticias/{newsItem}', [ApiController::class, 'noticiaUpdate']);
Route::delete('/api/admin/noticias/{newsItem}', [ApiController::class, 'noticiaDestroy']);

Route::get('/api/admin/areas', [ApiController::class, 'areasList']);
Route::post('/api/admin/areas', [ApiController::class, 'areaStore']);
Route::put('/api/admin/areas/{courseArea}', [ApiController::class, 'areaUpdate']);
Route::delete('/api/admin/areas/{courseArea}', [ApiController::class, 'areaDestroy']);

Route::get('/api/admin/cursos', [ApiController::class, 'cursosAdmin']);
Route::post('/api/admin/cursos', [ApiController::class, 'cursoStore']);
Route::put('/api/admin/cursos/{course}', [ApiController::class, 'cursoUpdate']);
Route::delete('/api/admin/cursos/{course}', [ApiController::class, 'cursoDestroy']);

Route::get('/api/admin/galeria', [ApiController::class, 'galeriaAdmin']);
Route::post('/api/admin/galeria', [ApiController::class, 'galeriaStore']);
Route::put('/api/admin/galeria/{galleryItem}', [ApiController::class, 'galeriaUpdate']);
Route::delete('/api/admin/galeria/{galleryItem}', [ApiController::class, 'galeriaDestroy']);

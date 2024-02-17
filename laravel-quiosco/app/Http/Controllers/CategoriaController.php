<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoriaCollection;
use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function index() {

        // Forma estandar de convertir una respuesta json de una tabla de tu DB
        // return response()->json( ['categorias' => Categoria::all()] );

        return new CategoriaCollection(Categoria::all());
    }
}

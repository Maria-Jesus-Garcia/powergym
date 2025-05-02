<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Entrenamiento;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ejercicio>
 */
class EjercicioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this ->faker->word(),
            'descripcion' => $this->faker->sentence(),
            'grupo_muscular' => $this->faker->randomElement(['Piernas', 'Espalda', 'Biceps', 'Tríceps', 'Abdomen', 'Hombro', 'Lumbar']),
            'tipo'=> $this->faker->randomElement(['Fuerza', 'Cardio', 'Estiramientos']),
            'urlfoto'=> $this->faker->imageUrl(),
            //'entrenamiento_id' => null
        ];
    }
}

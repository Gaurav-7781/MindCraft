<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $achievements = [
            [
                'name' => 'First Steps',
                'description' => 'Completed your first learning module.',
                'icon_url' => 'BookOpen',
                'criteria' => 'module_1_completed',
            ],
            [
                'name' => 'Quiz Whiz',
                'description' => 'Scored 100% on a quiz.',
                'icon_url' => 'Star',
                'criteria' => 'quiz_100_percent',
            ],
            [
                'name' => 'IP Defender',
                'description' => 'Played the IP Catcher game for the first time.',
                'icon_url' => 'Shield',
                'criteria' => 'game_played',
            ],
            [
                'name' => 'Patent Master',
                'description' => 'Completed the Patent module.',
                'icon_url' => 'Lock',
                'criteria' => 'module_patent_completed',
            ]
        ];

        foreach ($achievements as $achievement) {
            \App\Models\Achievement::firstOrCreate(
                ['name' => $achievement['name']],
                $achievement
            );
        }
    }
}

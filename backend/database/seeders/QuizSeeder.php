<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Question;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        // Clear old quizzes to prevent duplicates
        Question::query()->delete();
        Quiz::query()->delete();

        // 1. Copyrights
        $copyrightQuiz = Quiz::create([
            'title' => 'Copyrights',
            'description' => 'Test your knowledge on protecting original creative works.',
            'reward_xp' => 100
        ]);

        Question::create([
            'quiz_id' => $copyrightQuiz->id,
            'question_text' => 'What does a copyright protect?',
            'options' => [
                'An invention',
                'A brand name',
                'Original works of authorship',
                'A secret formula'
            ],
            'correct_answer' => 'Original works of authorship'
        ]);

        Question::create([
            'quiz_id' => $copyrightQuiz->id,
            'question_text' => 'How long does a copyright usually last?',
            'options' => [
                '20 years',
                '10 years from publication',
                'Life of the author plus 70 years',
                'Forever'
            ],
            'correct_answer' => 'Life of the author plus 70 years'
        ]);

        Question::create([
            'quiz_id' => $copyrightQuiz->id,
            'question_text' => 'Which of the following is protected by copyright?',
            'options' => [
                'A new engine design',
                'Software code',
                'A company name',
                'A recipe'
            ],
            'correct_answer' => 'Software code'
        ]);

        // 2. Trademarks
        $trademarkQuiz = Quiz::create([
            'title' => 'Trademarks',
            'description' => 'Test your knowledge on brand identity protection.',
            'reward_xp' => 100
        ]);

        Question::create([
            'quiz_id' => $trademarkQuiz->id,
            'question_text' => 'What is the main purpose of a trademark?',
            'options' => [
                'To protect a new invention',
                'To protect a song',
                'To identify products or services of a particular source',
                'To keep business information secret'
            ],
            'correct_answer' => 'To identify products or services of a particular source'
        ]);

        Question::create([
            'quiz_id' => $trademarkQuiz->id,
            'question_text' => 'How long can a trademark last?',
            'options' => [
                '20 years',
                '70 years',
                '10 years maximum',
                'Forever, as long as it is used in commerce'
            ],
            'correct_answer' => 'Forever, as long as it is used in commerce'
        ]);

        Question::create([
            'quiz_id' => $trademarkQuiz->id,
            'question_text' => 'Which of these is an example of a trademark?',
            'options' => [
                'The Nike swoosh',
                'A novel',
                'A solar panel design',
                'The Coca-Cola recipe'
            ],
            'correct_answer' => 'The Nike swoosh'
        ]);

        // 3. Patents
        $patentQuiz = Quiz::create([
            'title' => 'Patents',
            'description' => 'Test your knowledge on protecting inventions and technical solutions.',
            'reward_xp' => 150
        ]);

        Question::create([
            'quiz_id' => $patentQuiz->id,
            'question_text' => 'What does a patent protect?',
            'options' => [
                'A recognizable sign or logo',
                'An invention or technical solution',
                'An original book',
                'Confidential business data'
            ],
            'correct_answer' => 'An invention or technical solution'
        ]);

        Question::create([
            'quiz_id' => $patentQuiz->id,
            'question_text' => 'What is the general duration of a patent from the filing date?',
            'options' => [
                '10 years',
                '20 years',
                '50 years',
                'Life of the inventor'
            ],
            'correct_answer' => '20 years'
        ]);

        Question::create([
            'quiz_id' => $patentQuiz->id,
            'question_text' => 'Which of these would be eligible for a patent?',
            'options' => [
                'A pharmaceutical drug formula',
                'A slogan',
                'A painting',
                'A customer list'
            ],
            'correct_answer' => 'A pharmaceutical drug formula'
        ]);

        // 4. Trade Secrets
        $tradeSecretQuiz = Quiz::create([
            'title' => 'Trade Secrets',
            'description' => 'Test your knowledge on confidential business information.',
            'reward_xp' => 150
        ]);

        Question::create([
            'quiz_id' => $tradeSecretQuiz->id,
            'question_text' => 'What is a trade secret?',
            'options' => [
                'A government registered invention',
                'Confidential information which may be sold or licensed',
                'A brand name used in commerce',
                'An original piece of art'
            ],
            'correct_answer' => 'Confidential information which may be sold or licensed'
        ]);

        Question::create([
            'quiz_id' => $tradeSecretQuiz->id,
            'question_text' => 'What is the main requirement to keep a trade secret valid?',
            'options' => [
                'It must be renewed every 10 years',
                'It must be registered with the patent office',
                'It must be kept secret to maintain its value',
                'It must be published'
            ],
            'correct_answer' => 'It must be kept secret to maintain its value'
        ]);

        Question::create([
            'quiz_id' => $tradeSecretQuiz->id,
            'question_text' => 'Which of the following is a famous example of a trade secret?',
            'options' => [
                'The Apple logo',
                'The Coca-Cola recipe',
                'The Harry Potter books',
                'The lightbulb'
            ],
            'correct_answer' => 'The Coca-Cola recipe'
        ]);
    }
}

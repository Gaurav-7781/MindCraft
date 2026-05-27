<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'xp',
        'level',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Add XP and calculate level
     * 
     * @param int $amount
     * @return array Contains old and new level for frontend animations
     */
    public function addXP(int $amount)
    {
        $oldLevel = $this->level;
        $this->xp += $amount;
        
        // Simple leveling curve: Level 1 = 0-99 XP, Level 2 = 100-199 XP, etc.
        $newLevel = floor($this->xp / 100) + 1;
        $levelUp = $newLevel > $oldLevel;
        
        if ($levelUp) {
            $this->level = $newLevel;
        }
        
        $this->save();
        
        return [
            'xp_added' => $amount,
            'total_xp' => $this->xp,
            'old_level' => $oldLevel,
            'new_level' => $this->level,
            'leveled_up' => $levelUp
        ];
    }

    public function moduleProgress()
    {
        return $this->hasMany(ModuleProgress::class);
    }

    public function achievements()
    {
        return $this->belongsToMany(Achievement::class, 'user_achievements');
    }

    public function tokens()
    {
        return $this->morphMany(\App\Models\PersonalAccessToken::class, 'tokenable');
    }

    public function createToken(string $name, array $abilities = ['*'], \DateTimeInterface $expiresAt = null)
    {
        $plainTextToken = \Illuminate\Support\Str::random(40);

        $token = $this->tokens()->create([
            'name' => $name,
            'token' => hash('sha256', $plainTextToken),
            'abilities' => $abilities,
            'expires_at' => $expiresAt,
        ]);

        return new \App\Models\NewAccessToken($token, $token->getKey().'|'.$plainTextToken);
    }
}

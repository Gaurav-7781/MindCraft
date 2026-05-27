<?php

namespace App\Models;

class NewAccessToken
{
    public function __construct(public PersonalAccessToken $accessToken, public string $plainTextToken)
    {
    }
}

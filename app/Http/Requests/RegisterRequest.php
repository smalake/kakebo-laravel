<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'max:20'],
            'uid' => ['required', Rule::unique('users')->ignore($this->user->id ?? null)],
        ];
    }

    public function messages()
    {
        // TODO: 今のフォームに合わせて修正が必要
        return [
            'name.required' => '表示名は必須です',
            'name.max' => '表示名は20文字以内である必要があります',
            'uid.required' => 'UIDは必須です',
            'uid.unique' => 'すでに登録済みのユーザーです',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $res = response()->json(
            [
                'errors' => $validator->errors(),
            ],
            400
        );
        throw new HttpResponseException($res);
    }
}

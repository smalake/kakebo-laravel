<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('create_user');
            // $table->foreign('create_user')->references('uid')->on('users')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->string('update_user')->nullable();
            // $table->foreign('update_user')->references('uid')->on('users')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->integer('category');
            $table->integer('amount');
            $table->date('date');
            $table->string('store_name')->nullable();
            $table->integer('group_id');
            // $table->foreign('group_id')->references('id')->on('groups')->onUpdate('RESTRICT')->onDelete('RESTRICT');
            $table->integer('is_private')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
};

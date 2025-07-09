<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
            $table->date('date_of_birth')->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('nationality', 100)->nullable();
            $table->string('address_line')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('zip', 20)->nullable();
            $table->string('desired_position')->nullable();
            $table->unsignedInteger('years_experience')->nullable();
            $table->string('education_level')->nullable();
            $table->text('certifications_text')->nullable();
            $table->text('employment_history')->nullable();
            $table->text('references_text')->nullable();
            $table->string('id_copy_path')->nullable();
            $table->string('certification_path')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropColumn([
                'date_of_birth',
                'gender',
                'nationality',
                'address_line',
                'city',
                'state',
                'zip',
                'desired_position',
                'years_experience',
                'education_level',
                'certifications_text',
                'employment_history',
                'references_text',
                'id_copy_path',
                'certification_path',
            ]);
        });
    }
};

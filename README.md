symfony new api

cd api

symfony serve -d

composer require api

composer require maker --dev

php bin/console make:entity

php bin/console doctrine:database:create

php bin/console make:migration
php bin/console doctrine:migrations:migrate

php bin/console debug:router
https://127.0.0.1:8000/api/proprietaires/1.json

composer require profiler --dev
https://127.0.0.1:8000/_profiler

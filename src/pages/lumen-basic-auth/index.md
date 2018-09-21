---
title: 'Basic Authentication with Lumen'
date: '2016-02-02'
path: '/2016/02/02/basic-authentication-with-lumen-2'
---

#### The Problem

The other day I was trying to create a simple admin page without having to rely on a database and all of the other stuff. I knew how to do it with with an `.htaccess` file but since I was using Lumen it wasn't quite going to work. I have to admit that I'm new to the Laravel/Lumen but so far I've come to really like it and I enjoy working with it. The solution I come up with is using Middleware.

#### The Solution

The first thing we need to do is to uncomment the following lines inside the `bootstrap/app.php` file.

```
//Uncomment
  $app->withEloquent();
  $app->withFacades();
```

Lets add the middleware to the same file.

```
$app->routeMiddleware([
  'BasicAuth' => 'App\Http\Middleware\BasicAuthMiddleware',
]);
```

Keep in mind that `'BasicAuth' => 'App\Http\Middleware\BasicAuthMiddleware'` is our custom Middleware.

Next we have to create our Middleware inside `app/Http/Middleware/`. Let's name is `BasicAuthMiddleware.php` and this is what to put inside.

```
<?php

  namespace App\Http\Middleware;

  use Closure;

  class BasicAuthMiddleware
  {
      /**
        * Handle an incoming request.
        *
        * @param  \Illuminate\Http\Request  $request
        * @param  \Closure  $next
        * @return mixed
        */
      public function handle($request, Closure $next) {
          if($request->getUser() != 'admin' || $request->getPassword() != 'PasswordHere!') {
              $headers = array('WWW-Authenticate' => 'Basic');
              return response('Admin Login', 401, $headers);
          }
          return $next($request);
      }
  }
```

This just simply takes in any request, checks the entered username and password, if they match then the user sees the page, otherwise ask again.

The last thing we need to do is inject our custom Middleware with our routes inside the `app/HTTP/routes.php` file. Here is a basic example.

```
$app->group(['prefix'=>'admin/', 'middleware' => 'BasicAuth', 'namespace' => 'App\Http\Controllers'], function($app) {
    $app->get('/', 'AdminController@index');
    $app->get('/manage', 'AdminController@index');
});
```

That is all we need to get Basic Authentication working.

---

Useful Links

- HTTP Middleware https://lumen.laravel.com/docs/5.2/middleware
- Routing https://lumen.laravel.com/docs/5.2/routing




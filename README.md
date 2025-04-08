# Облачное хранилище Haze Cloud

Развернутое на сервере REG.RU [приложение](http://95.163.223.147/).

## Запуск приложения на локальном диске

1. Создаём директорию для проекта
2. Клонируем в неё репозиторий:
   ```
   git clone https://github.com/Rail-G/MyCloud.git
   ```
3. Открываем папку `MyCloud` в любой IDE и запускаем встроенный терминал

4. Переходим в папку `backend`:
   ```
   cd backend
   ```
5. Создаём виртуальное окружение:
   ```
   python -m venv env
   ```
6. Активируем его:
   ```
   env/Scripts/activate
   ```
7. Устанавливаем зависимости:
   ```
   pip install -r requirements.txt
   ```
8. В папке `backend` создаём файл `.env` в соответствии с шаблоном:
      ```
      DB_NAME = 'name'
      DB_HOST = 'host'
      DB_PORT = 'port'
      DB_USER = 'user'
      DB_PASSWORD = 'password'

      SECRET_KEY = 'secretkey'

      DEBUG = 'debug'

      ALLOWED_HOSTS = 'hosts,
      ```
9. Создаём базу данных с учётом настроек указанных в файле `.env`:
   `createdb -U <DB_USER> <DB_NAME>` Пароль: `<DB_PASSWORD>`
10. Применяем миграции:
   ```
   python manage.py migrate
   ```
11. Создаём суперпользователя с указанными в файле `.env` данными:
   ```
   python manage.py createsuperuser
   ```
12. Запускаем сервер:
   ```
   python manage.py runserver
   ```
13. Открываем второй терминал в директории `frontend`
14. В файле `.env` указываем базовый URL сервера:
   ```
   VITE_SERVER_URL=http://localhost:8000/
   ```
15. Устанавливаем пакет yarn, если не установлен:
   ```
   npm install -g yarn
   ```
16. Устанавливаем необходимые зависимости:
   ```
   yarn install
   ```
17. Запускаем приложение:
   ```
   yarn run dev
   ```

## Развёртывание приложения на облачном сервере

1. Генерируем SSH-ключ, если его ещё нет
2. Копируем публичный SSH-ключ
3. Создаем на сайте [reg.ru](https://cloud.reg.ru) облачный сервер:
   - образ - `Ubuntu 22.04 LTS`
   - vCPU и тип диска - `Стандартный`
   - тариф - `Std C1-M1-D10`
   - регион размещения - `Москва`
   
   Добавляем наш публичный SSH-ключ, задав ему название.

   Указываем название сервера.

   Нажимаем кнопку `Заказать сервер`

   Получаем по электронной почте данные для подключения к серверу через SSH.
4. Запускаем терминал и подключаемся к серверу, использую полученные данные:
   ```
   ssh root@<ip адрес сервера>
   ```
   Вводим пароль
5. Создаем нового пользователя:
   ```
   adduser <имя пользователя>
   ```
6. Добавляем созданного пользователя в группу `sudo`:
   ```
   usermod <имя пользователя> -aG sudo
   ```
7. Выходим из-под пользователя `root`:
   ```
   logout
   ```
8. Подключаемся к серверу под новым пользователем:
   ```
   ssh <имя пользователя>@<ip адрес сервера>
   ```
9. Скачиваем обновления пакетов `apt`:
   ```
   sudo apt update
   ```
10. Устанавливаем необходимые пакеты:
   ```
   sudo apt install python3-venv python3-pip postgresql nginx
   ```
11. Заходим в терминал `psql` под пользователем `postgres`:
   ```
   sudo -u postgres psql
   ```
12. Создаём базу данных:
   ```
   create database db_cloud;
   ```
13. Задаём пароль для пользователя `postgres`:
   ```
   alter user postgres with password 'pass';
   ```
14. Выходим из терминала `psql`:
   ```
   \q
   ```
15. Проверяем, что установлен `git`:
   ```
   git --version
   ```
16. Клонируем репозиторий с проектом:
   ```
   git clone https://github.com/Rail-G/MyCloud.git
   ```
17. Переходим в папку `backend`:
   ```
   cd /home/<имя пользователя>/MyCloud/backend
   ```
18. Устанавливаем виртуальное окружение:
   ```
   python3 -m venv env
   ```
19. Активируем его:
   ```
   source env/bin/activate
   ```
20. Устанавливаем необходимые зависимости:
   ```
   pip install -r requirements.txt
   ```
21. Если в зависимостях отсутствует gunicorn, тоже установите:
   ```
   pip install gunicorn
   ```
22. В папке `backend` создаём файл `.env` 
   ```
   nano .env
   ```

   в соответствии с шаблоном:
   ```
   DB_NAME = 'name'
   DB_HOST = 'host'
   DB_PORT = 'port'
   DB_USER = 'user'
   DB_PASSWORD = 'password'

   SECRET_KEY = 'secretkey'

   DEBUG = 'debug'

   ALLOWED_HOSTS = 'hosts,
   ```
23. Применяем миграции:
   ```
   python manage.py migrate
   ```
24. Создаём суперпользователя:
   ```
   python manage.py createsuperuser
   ```
25. Собираем весь статичный контент в одну папку на сервере:
   ```
   python manage.py collectstatic
   ```
26. Запускаем и проверяем работоспособность сервера, за тем выходим:
   ```
   python manage.py runserver 0.0.0.0:8000
   ```
27. Проверяем работу `gunicorn`:
   ```
   gunicorn backend.wsgi -b 0.0.0.0:8000
   ```
28. Создаём сервис `gunicorn.service`:
   ```
   sudo nano /etc/systemd/system/gunicorn.service
   ```
   с содержимым

      ```
      [Unit]
      Description=gunicorn service
      After=network.target

      [Service]
      User=<имя пользователя>
      Group=www-data
      WorkingDirectory=/home/<имя пользователя>/MyCloud/backend
      ExecStart=/home/<имя пользователя>/MyCloud/backend/env/bin/gunicorn \
               --access-logfile - \
               --workers=3 \
               --bind unix:/home/gamurai/MyCloud/backend/backend/project.sock \
               backend.wsgi:application

      [Install]
      WantedBy=multi-user.target
      ```
29. Запускаем сокет `gunicorn`:
   ```
   sudo systemctl start gunicorn
   ```
   ```
   sudo systemctl enable gunicorn
   ```
30. Проверяем его статус:
   ```
   sudo systemctl status gunicorn
   ```
31. Проверяем статус `gunicorn`:
   ```
   sudo systemctl status gunicorn
   ```
32. Создаём модуль `nginx`:
   ```
   sudo nano /etc/nginx/sites-available/backend
   ```
   со следующим содержимым

      ```
      server {
         listen 80;
         server_name <ip_адрес_сервера>;

         location = /favicon.ico {
            access_log off;
            log_not_found off;
         }

         location /static/ {
            root /home/gamurai/MyCloud/backend;
         }

         location /media/ {
            root /home/gamurai/MyCloud/backend;
         }

         location /api/ {
            include proxy_params;
            proxy_pass http://unix:/home/gamurai/MyCloud/backend/backend/project.sock;
         }

         location / {
            root /home/gamurai/MyCloud/frontend/dist;
            try_files $uri $uri/ /index.html;
         }
      }
      ```
33. Создаём символическую ссылку:
   ```
   sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled
   ```
34. Добавляем пользователя `www-data` в группу текущего пользователя:
   ```
   sudo usermod -aG <имя пользователя> www-data
   ```
35. Диагностируем `nginx` на предмет ошибок в синтаксисе:
   ```
   sudo nginx -t
   ```
36. Перезапускаем веб-сервер:
   ```
   sudo systemctl restart nginx
   ```
37. Проверяем статус `nginx`:
   ```
   sudo systemctl status nginx
   ```
38. При помощи `firewall` даём полные права `nginx` для подключений:
   ```
   sudo ufw allow 'Nginx Full'
   ```
39. Устанавливаем [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm):
   ```
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
   ```
40. Добавляем переменную окружения:
   ```
   export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```
41. Проверяем версию `nvm`:
   ```
   nvm -v
   ```
42. Устанавливаем нужную версию `node`:
   ```
   nvm install <номер версии>
   ```
43. Переходим в папку проекта `frontend`:
   ```
   cd /home/<имя пользователя>/MyCloud/frontend
   ```
44. Создаём файл `.env`
   ```
   nano .env
   ```

   и указываем в нём базовый URL:
   ```
   VITE_SERVER_URL=http://<ip адрес сервера>/
   ```
45. Устанавливаем yarn, если отсутсвует:
   ```
   npm install -g yarn
   ```
46. Устанавливаем зависимости:
   ```
   yarn install
   ```

47. Запускаем стройку проекта:
   ```
   yarn run build
   ```
48. Перезапускаем nginx:
   ```
   sudo systemctl restart nginx
   ```
49. Проверяем доступ к сайту:
   ```
   http://<ip адрес сервера>/
   ```
50. Проверяем доступ к серверной части:
   ```
   http://<ip адрес сервера>/api/
   ```
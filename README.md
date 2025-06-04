# mo-admin-front
Фронт админки myobject

## Настройка проекта
****
1. Если проект разворачивается на Windows, то скорее всего нужно будет установить [https://aka.ms/vs/17/release/vc_redist.x64.exe](https://aka.ms/vs/17/release/vc_redist.x64.exe)
2. Предполагается, что у вас есть доступ к репозиториям **mo-front** и [mo-ui-react](https://github.com/LivingCore/mo-ui-react)
3. Предполагается, что у вас уже локально развёрнут бэкенд [mo-workflow](https://github.com/LivingCore/mo-workflow) и доступен по адресу [http://myobject.local](http://myobject.local)
4. Установить nodejs версии [20.12.2](https://nodejs.org/download/release/v20.12.2/), желательно через **nvm**, т.к. старый фронт и новый фронт МyObject работают на разных версиях
5. Склонировать данный репозиторий и в консоли перейти в папку проекта
6. Последовательно выполнить команды:
```
npm install
git submodule update --init --recursive
```
7. В корне проекта создать файл **.env.development.local** со следующим содержимым:
```
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=http://admin.myobject.local
NEXT_TELEMETRY_DISABLED=1
```
8. Запустить проект, выполнив команду:
```
npm run dev
```
8.1 Или запустить проект в продакшн режиме:
```
npm run build
npm start
```
9. Открыть в браузере ссылку [http://localhost:3000](http://localhost:3000)
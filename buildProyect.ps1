Remove-Item -Path ./server/public/* -Recurse
Set-Location -Path ./vue-frontend
npm run build
Set-Location -Path ..
Copy-Item ./vue-frontend/dist/* -Recurse ./server/public/
git add *
git commit -m "This is an automated commit"
git push origin master

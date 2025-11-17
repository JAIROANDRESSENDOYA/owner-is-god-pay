# create_full_scaffold.ps1
# Ejecutar desde la raíz de owner-is-god-pay (clonado)

$ErrorActionPreference = "Stop"
function Write-File($path, $content) {
  $dir = Split-Path $path -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $content | Out-File -Encoding UTF8 -FilePath $path -Force
}
$root = (Get-Location).Path
Write-Host "Creando scaffold en $root ..."

# FRONTEND
$frontend = Join-Path $root "frontend"
Write-Host " - frontend -> $frontend"
Write-File (Join-Path $frontend "package.json") '{
  "name":"owner-is-god-pay-frontend",
  "version":"0.3.0",
  "private":true,
  "scripts":{"dev":"vite","build":"vite build","preview":"vite preview"},
  "dependencies":{"react":"^18.2.0","react-dom":"^18.2.0","i18next":"^23.0.0","react-i18next":"^13.0.0","axios":"^1.4.0"},
  "devDependencies":{"vite":"^5.0.0","@vitejs/plugin-react":"^4.0.0"}
}'
Write-File (Join-Path $frontend "index.html") "<!doctype html>
<html>
  <head>
    <meta charset='utf-8'/>
    <meta name='viewport' content='width=device-width,initial-scale=1.0'/>
    <title>Owner Is God Pay</title>
  </head>
  <body>
    <div id='root'></div>
    <script type='module' src='/src/main.jsx'></script>
  </body>
</html>"
Write-File (Join-Path $frontend "src/main.jsx") "import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './i18n'
createRoot(document.getElementById('root')).render(<App />)
"
Write-File (Join-Path $frontend "src/styles.css") ":root{--bg:#f6fbff;--accent:#3bb6c9;--text:#0b2940}
body{font-family:Inter, system-ui; margin:0; background:var(--bg); color:var(--text)}
.wrap{max-width:1000px;margin:28px auto;padding:16px}
.card{background:#fff;padding:16px;border-radius:12px;box-shadow:0 6px 18px rgba(10,20,30,0.06);margin-top:16px}
.header{display:flex;justify-content:space-between;align-items:center}
.nav{display:flex;gap:8px}
"
Write-File (Join-Path $frontend "src/i18n.js") "import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import en from './locales/en.json'
import ar from './locales/ar.json'
import ja from './locales/ja.json'
i18n.use(initReactI18next).init({
  resources:{ es:{translation:es}, en:{translation:en}, ar:{translation:ar}, ja:{translation:ja} },
  lng:'es',
  fallbackLng:'en',
  interpolation:{ escapeValue:false }
})
export default i18n
"

# locales
$es = '{
  "title":"Owner Is God Pay",
  "subtitle":"Plataforma para monetizar con pagos y retiros",
  "premium":"Suscripción Premium",
  "email":"Correo",
  "pay":"Pagar $4.99",
  "processing":"Procesando...",
  "paid_ok":"Pago completado ✔️",
  "withdraw":"Retiro",
  "country":"País",
  "bank":"Banco",
  "amount":"Monto",
  "request_withdraw":"Solicitar retiro",
  "withdraw_requested":"Retiro solicitado. Espera aprobación.",
  "login":"Iniciar sesión",
  "register":"Registrarse",
  "logout":"Cerrar sesión",
  "admin":"Panel Admin"
}'
$en = '{
  "title":"Owner Is God Pay",
  "subtitle":"Platform to monetize with payments and withdrawals",
  "premium":"Premium Subscription",
  "email":"Email",
  "pay":"Pay $4.99",
  "processing":"Processing...",
  "paid_ok":"Payment completed ✔️",
  "withdraw":"Withdraw",
  "country":"Country",
  "bank":"Bank",
  "amount":"Amount",
  "request_withdraw":"Request withdrawal",
  "withdraw_requested":"Withdrawal requested. Await approval.",
  "login":"Login",
  "register":"Register",
  "logout":"Logout",
  "admin":"Admin Panel"
}'
$ar = '{
  "title":"أونر إز جاد باي",
  "subtitle":"منصة لتحقيق الدخل عبر المدفوعات والسحوبات",
  "premium":"اشتراك مميز",
  "email":"البريد الإلكتروني",
  "pay":"ادفع $4.99",
  "processing":"جارٍ المعالجة...",
  "paid_ok":"اكتمل الدفع ✔️",
  "withdraw":"سحب",
  "country":"البلد",
  "bank":"المصرف",
  "amount":"المبلغ",
  "request_withdraw":"طلب سحب",
  "withdraw_requested":"تم طلب السحب. انتظر الموافقة.",
  "login":"تسجيل الدخول",
  "register":"التسجيل",
  "logout":"تسجيل الخروج",
  "admin":"لوحة المدير"
}'
$ja = '{
  "title":"オーナーイズゴッドペイ",
  "subtitle":"支払いと出金でマネタイズするプラットフォーム",
  "premium":"プレミアム購読",
  "email":"メール",
  "pay":"支払う $4.99",
  "processing":"処理中...",
  "paid_ok":"支払い完了 ✔️",
  "withdraw":"出金",
  "country":"国",
  "bank":"銀行",
  "amount":"金額",
  "request_withdraw":"出金を申請",
  "withdraw_requested":"出金が申請されました。承認をお待ちください。",
  "login":"ログイン",
  "register":"登録",
  "logout":"ログアウト",
  "admin":"管理パネル"
}' 
Write-File (Join-Path $frontend "src/locales/es.json") $es
Write-File (Join-Path $frontend "src/locales/en.json") $en
Write-File (Join-Path $frontend "src/locales/ar.json") $ar
Write-File (Join-Path $frontend "src/locales/ja.json") $ja

# frontend components: auth, Login, Register, Admin, App
Write-File (Join-Path $frontend "src/auth.js") "import axios from 'axios'
export async function register(email,password){ return axios.post('/api/auth/register',{email,password}) }
export async function login(email,password){ return axios.post('/api/auth/login',{email,password}) }
export function setToken(token){ localStorage.setItem('oig_token', token) }
export function getToken(){ return localStorage.getItem('oig_token') }
export function logout(){ localStorage.removeItem('oig_token') }
"
Write-File (Join-Path $frontend "src/Login.jsx") "import React, {useState} from 'react'
import { login, setToken } from './auth'
export default function Login(){ const [email,setEmail]=useState(''), [pw,setPw]=useState('')
  async function doLogin(){ try{ const r=await login(email,pw); setToken(r.data.token); alert('Logged in') }catch(e){ alert('error') } }
  return (<div><h3>Login</h3><input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} /><input placeholder='password' type='password' value={pw} onChange={e=>setPw(e.target.value)} /><button onClick={doLogin}>Login</button></div>)
}
"
Write-File (Join-Path $frontend "src/Register.jsx") "import React, {useState} from 'react'
import { register } from './auth'
export default function Register(){ const [email,setEmail]=useState(''), [pw,setPw]=useState('')
  async function doRegister(){ try{ await register(email,pw); alert('registered') }catch(e){ alert('error') } }
  return (<div><h3>Register</h3><input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} /><input placeholder='password' type='password' value={pw} onChange={e=>setPw(e.target.value)} /><button onClick={doRegister}>Register</button></div>)
}
"
Write-File (Join-Path $frontend "src/Admin.jsx") "import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function Admin(){ const [withdraws,setWithdraws]=useState([])
  useEffect(()=>{ axios.get('/api/admin/withdraws').then(r=>setWithdraws(r.data)).catch(()=>{}) },[])
  return (<div><h3>Admin - Withdraws</h3>{withdraws.map(w=>(<div key={w.id}>{w.email} - {w.amount} - {w.status}</div>))}</div>)}
"
Write-File (Join-Path $frontend "src/App.jsx") "import React, {useState,useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import Login from './Login'
import Register from './Register'
import Admin from './Admin'
import { logout, getToken } from './auth'
export default function App(){
  const { t, i18n } = useTranslation()
  const [email,setEmail]=useState('')
  const [status,setStatus]=useState('idle')
  const [banks,setBanks]=useState([])
  const [country,setCountry]=useState('CO')
  const [withdrawAmount,setWithdrawAmount]=useState('')
  useEffect(()=>{ fetchBanks(country) },[country])
  async function fetchBanks(ctry){ try{ const res = await axios.get('/api/banks?country='+ctry); setBanks(res.data) }catch(e){ setBanks([]) } }
  async function simulatePay(){ setStatus('processing'); try{ await axios.post('/api/pay',{email,amount:4.99,currency:\"USD\"}); setStatus('success') }catch(e){ setStatus('error') } }
  async function requestWithdraw(){ try{ await axios.post('/api/withdraw',{email,amount:withdrawAmount,country}); alert(t('withdraw_requested')) }catch(e){ alert('error') } }
  return (<div className='wrap'>
    <div className='header'><div><h1>{t('title')}</h1><p>{t('subtitle')}</p></div><div className='nav'><select onChange={e=>i18n.changeLanguage(e.target.value)} defaultValue={'es'}><option value='es'>Español</option><option value='en'>English</option><option value='ar'>العربية</option><option value='ja'>日本語</option></select>
    <button onClick={()=>{ logout(); alert('logged out') }}>Logout</button></div></div>
    <main>
      <section className='card'>
        <h2>{t('premium')}</h2>
        <label>{t('email')}<input value={email} onChange={e=>setEmail(e.target.value)} placeholder='tu@correo.com' /></label>
        <div className='actions'>
          <button onClick={simulatePay} disabled={status==='processing'}>{ status==='processing'?t('processing'):t('pay') }</button>
        </div>
        { status==='success' && <p className='ok'>{t('paid_ok')}</p> }
      </section>

      <section className='card'>
        <h3>{t('withdraw')}</h3>
        <label>{t('country')}
          <select value={country} onChange={e=>setCountry(e.target.value)}>
            <option value='CO'>Colombia</option><option value='US'>United States</option><option value='JP'>Japan</option><option value='ES'>Spain</option><option value='SA'>Saudi Arabia</option>
          </select>
        </label>
        <label>{t('bank')}
          <select>
            {banks.map(b=><option key={b.code} value={b.code}>{b.name}</option>)}
          </select>
        </label>
        <label>{t('amount')}<input value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} /></label>
        <div className='actions'><button onClick={requestWithdraw}>{t('request_withdraw')}</button></div>
      </section>

      <section className='card'><h3>{t('login')}</h3><Register/><Login/></section>
      <section className='card'><Admin/></section>
    </main>
  </div>)
}
"

# frontend Dockerfile
Write-File (Join-Path $frontend "Dockerfile") "FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
CMD [\"npm\",\"run\",\"dev\",\"--\",\"--host\"]"
# BACKEND
$backend = Join-Path $root "backend"
Write-Host " - backend -> $backend"
Write-File (Join-Path $backend "package.json") '{
  "name":"owner-is-god-pay-backend",
  "version":"0.3.0",
  "private":true,
  "scripts":{"start":"node index.js","dev":"nodemon index.js"},
  "dependencies":{"express":"^4.18.2","cors":"^2.8.5","body-parser":"^1.20.2","mongoose":"^7.3.1","bcrypt":"^5.1.0","jsonwebtoken":"^9.0.0","stripe":"^11.0.0","dotenv":"^16.0.0"}
}'
Write-File (Join-Path $backend ".env.example") "MONGODB_URI=mongodb://mongo:27017/ownerisgod
JWT_SECRET=tu_secreto_jwt_aqui
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_ENDPOINT_SECRET=whsec_xxx
PORT=5000
"
Write-File (Join-Path $backend "index.js") "require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const payRoutes = require('./routes/pay')
const adminRoutes = require('./routes/admin')
const banks = require('./data/banks.json')
const app = express()
app.use(cors()); app.use(bodyParser.json())
// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ownerisgod'
mongoose.connect(mongoUri, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=> console.log('Mongo connected')).catch(err=>console.log('Mongo err', err))
app.get('/api/banks', (req,res)=> {
  const country = (req.query.country||'CO').toUpperCase()
  res.json(banks[country] || [])
})
app.use('/api/auth', authRoutes)
app.use('/api', payRoutes)
app.use('/api/admin', adminRoutes)
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log('Backend running on port', PORT))
"
# backend routes
$routesDir = Join-Path $backend "routes"
if (-not (Test-Path $routesDir)) { New-Item -ItemType Directory -Force -Path $routesDir | Out-Null }
Write-File (Join-Path $routesDir "auth.js") "const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  email:{type:String, unique:true},
  password:String,
  role:{type:String, default:'user'},
  credits:{type:Number, default:0}
})
const User = mongoose.models.User || mongoose.model('User', UserSchema)
router.post('/register', async (req,res)=>{
  const {email,password} = req.body
  if(!email || !password) return res.status(400).json({error:'missing'})
  const hashed = await bcrypt.hash(password, 10)
  try{
    const user = await User.create({email, password:hashed})
    res.json({ok:true, user:{id:user._id, email:user.email}})
  }catch(e){
    res.status(400).json({error:'user_exists_or_invalid'})
  }
})
router.post('/login', async (req,res)=>{
  const {email,password} = req.body
  const user = await User.findOne({email})
  if(!user) return res.status(400).json({error:'no_user'})
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(400).json({error:'invalid_password'})
  const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET || 'secret', {expiresIn:'7d'})
  res.json({ok:true, token})
})
module.exports = router
"
Write-File (Join-Path $routesDir "pay.js") "const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '')
// Stripe checkout session (subscription example)
router.post('/stripe/create-checkout-session', async (req,res)=>{
  const {priceId, successUrl,cancelUrl,customerEmail} = req.body
  if(!process.env.STRIPE_SECRET_KEY) return res.status(500).json({error:'stripe_key_missing'})
  try{
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{price: priceId, quantity: 1}],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail
    })
    res.json({url: session.url})
  }catch(e){
    console.log('stripe err', e)
    res.status(500).json({error:'stripe_error', detail: e.message})
  }
})
// Stripe webhook (placeholder)
router.post('/stripe/webhook', express.raw({type:'application/json'}), (req,res)=>{
  console.log('webhook received')
  res.json({received:true})
})
router.post('/pay', (req,res)=>{ console.log('PAY', req.body); res.json({ok:true, message:'payment_received_simulated'}) })
router.post('/withdraw', (req,res)=>{ console.log('WITHDRAW', req.body); res.json({ok:true, message:'withdraw_request_received'}) })
router.post('/payu/create', (req,res)=>{ res.json({ok:true, message:'payu_placeholder'}) })
module.exports = router
"
Write-File (Join-Path $routesDir "admin.js") "const express = require('express')
const router = express.Router()
router.get('/health', (req,res)=> res.json({ok:true, ts:Date.now()}))
router.get('/withdraws', (req,res)=> {
  res.json([{id:1, email:'cliente@ejemplo.com', amount:50, status:'pending'}])
})
router.post('/withdraws/:id/approve', (req,res)=> { res.json({ok:true, message:'approved'}) })
module.exports = router
"
Write-File (Join-Path $backend "data/banks.json") '{
  "CO":[{"code":"BNC","name":"Banco de Bogotá"},{"code":"BBVA_CO","name":"BBVA Colombia"},{"code":"BSC","name":"Bancolombia"}],
  "US":[{"code":"CITI","name":"Citibank"},{"code":"WF","name":"Wells Fargo"},{"code":"BOA","name":"Bank of America"}],
  "JP":[{"code":"MUFG","name":"Mitsubishi UFJ Financial Group"},{"code":"SMBC","name":"Sumitomo Mitsui Banking Corporation"}],
  "ES":[{"code":"BBVA_ES","name":"BBVA España"},{"code":"SANT","name":"Banco Santander"}],
  "SA":[{"code":"SABB","name":"SABB"},{"code":"NCB","name":"NCB"}],
  "AE":[{"code":"ADIB","name":"Abu Dhabi Islamic Bank"},{"code":"ENBD","name":"Emirates NBD"}]
}'
Write-File (Join-Path $backend "Dockerfile") "FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
CMD [\"node\",\"index.js\"]"
# docker-compose
Write-File (Join-Path $root "docker-compose.yml") "version: '3.8'
services:
  mongo:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
  backend:
    build: ./backend
    ports:
      - '5000:5000'
    depends_on:
      - mongo
    environment:
      - MONGODB_URI=mongodb://mongo:27017/ownerisgod
  frontend:
    build: ./frontend
    ports:
      - '5173:5173'
    depends_on:
      - backend
volumes:
  mongo_data:
"
Write-File (Join-Path $root "README_OWNER_IS_GOD_PAY.txt") "Owner Is God Pay - Scaffold final
Contenido: frontend (i18n es,en,ar,ja), backend (auth, stripe placeholders), docker-compose, banks list.
Instrucciones:
1) cd frontend && npm install
2) cd ../backend && npm install
3) docker-compose up --build  # o levantar manualmente
4) editar backend/.env.example -> .env con claves reales (STRIPE, JWT, MONGODB_URI)
"
Write-Host "Scaffold creado correctamente."



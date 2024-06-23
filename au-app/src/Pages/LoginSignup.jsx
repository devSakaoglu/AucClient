import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom'; // Navigate ve Link bileşenlerini import ettik
import './LoginSignup.css'; // LoginSignup için CSS dosyasını import ettik

const LoginSignup = ({ onLogin }) => {
  // State'lerin tanımlanması
  const [email, setUsernameOrEmail] = useState(''); // Kullanıcı adı veya e-posta state'i
  const [password, setPassword] = useState(''); // Şifre state'i
  const [error, setError] = useState(''); // Hata mesajı state'i
  const [redirect, setRedirect] = useState(false); // Yönlendirme kontrolü için state

  // Form submit edildiğinde çalışacak işlev
  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun default submit işlemini engelledik

    try {
      // API'ye POST isteği gönderme
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON formatında veri gönderileceğini belirttik
        },
        body: JSON.stringify({ // Gönderilecek veri
          email,
          password,
        }),
      });
      console.log(await response.json())

      if (response.ok) { // Eğer API isteği başarılı ise
        const data = await response.json(); // API'den dönen veriyi JSON formatına dönüştürdük
        onLogin(data.username); // onLogin prop'unu kullanarak başarılı giriş durumunu uygulamaya bildirdik
        setRedirect(true); // Yönlendirme yapılacağını belirttik
      } else { // Eğer API isteği hata döndürdüyse
        const errorData = await response.json(); // Hata mesajını JSON formatına dönüştürdük
        setError(errorData.message); // Hata mesajını state'e kaydettik
      }
    } catch (error) {
      console.error('Login error:', error); // Herhangi bir hata durumunda konsola hata mesajını yazdırdık
      setError('Something went wrong. Please try again.'); // Genel hata mesajını gösterdik
    }
  };

  if (redirect) { // Eğer yönlendirme yapılması gerekiyorsa
    return <Navigate to='/' />; // Ana sayfaya yönlendirme yap
  }

  return (
    <div className="login-signup-container"> {/* Ana div elementi */}
      <form onSubmit={handleSubmit} className="login-form"> {/* Form elementi */}
        <input
          type="text"
          value={email}
          onChange={(e) => setUsernameOrEmail(e.target.value)} // Kullanıcı adı veya e-posta değiştiğinde state'i güncelle
          placeholder="Username" // Input için placeholder metni
          required // Zorunlu alan olduğunu belirttik
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Şifre değiştiğinde state'i güncelle
          placeholder="Password" // Input için placeholder metni
          required // Zorunlu alan olduğunu belirttik
        />
        {error && <p className="error-message">{error}</p>} {/* Hata varsa hata mesajını göster */}
        <button type="submit" className="login-button">Login</button> {/* Login butonu */}
      </form>
      <div className="register-link-container">
        <span>New User?</span>
        <Link to="/register" className="register-button">Register</Link>
      </div>
    </div>
  );
};

export default LoginSignup; // LoginSignup bileşenini dışa aktardık

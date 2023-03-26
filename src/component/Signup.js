import React, { useState, useRef, useEffect } from 'react';

function Signup() {
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const canvasRef = useRef(null);

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Generate random alphanumeric string and draw on canvas
  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = 150;
    canvas.height = 50;

    // Generate random alphanumeric string
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaString = '';
    for (let i = 0; i < 6; i++) {
      captchaString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captchaString);

    // Draw captcha string on canvas
    ctx.font = 'bold 40px sans-serif';
    ctx.fillStyle = '#EEE';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < captchaString.length; i++) {
      const x = 20 + i * 20;
      const y = 30 + Math.random() * 10 - 5;
      const color =
        'rgb(' +
        Math.floor(Math.random() * 51) +
        ', ' +
        Math.floor(Math.random() * 51) +
        ', ' +
        Math.floor(Math.random() * 51) +
        ')';
      const distortion = Math.random() * 0.4 - 0.2;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(distortion);
      ctx.fillStyle = color;
      ctx.fillText(captchaString[i], 0, 0);
      ctx.restore();
    }
  };

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle captcha input change
  const handleCaptchaInputChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaInput === captcha) {
      setFormSubmitted(true);
      alert('Captcha is correct!');
    } else {
      alert('Incorrect captcha');
    }
  };

  return (
    <div className="App">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Captcha:</label>
          <canvas ref={canvasRef} />
          <button
            type="button"
            className="refresh-captcha"
            onClick={() => generateCaptcha()}
          >
            Refresh image
          </button>
          <br />
          <input
            type="text"
            name="captchaInput"
            id="captchaInput"
            value={captchaInput}
            onChange={handleCaptchaInputChange}
            placeholder="Enter captcha"
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      {formSubmitted && (
        <div>
          <h2>Form submitted:</h2>
          <p>First Name: {formValues.firstName}</p>
          <p>Last Name: {formValues.lastName}</p>
          <p>Email: {formValues.email}</p>
          <p>Password: {formValues.password}</p>
        </div>
      )}
    </div>
  );
}

export default Signup;

